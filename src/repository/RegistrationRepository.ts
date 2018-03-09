import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { CounterRepository } from './CounterRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import * as mongoose from 'mongoose';
import to from './../util/promise-utils';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { RegistrationDto } from '../model/RegistrationDto';
import { SchedulerSchema } from '../model/ScheduleSchema';


export interface RegistrationRepository {
    findAll(): Promise<Array<RegistrationDto>>;
    insert(obj: RegistrationDto): Promise<RegistrationDto>;
    delete(obj: RegistrationDto): Promise<RegistrationDto[]>; 
    update(obj: RegistrationDto): Promise<RegistrationDto[]>; 
    cancel(obj: any): Promise<any>; 
}

@injectable()
export class RegistrationRepositoryImpl implements RegistrationRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    col;
    colScheduler;
    constructor() {
        // var mongoose = require('mongoose');
        var Schema = mongoose.Schema;
        this.col = mongoose.model('registration_tbl', RegistrationSchema, 'registration_tbl');
        this.colScheduler = mongoose.model('schedule_tbl', SchedulerSchema, 'schedule_tbl');
    }

    public async findAll(): Promise<Array<RegistrationDto>> {
        return this.col.find({
            email: null
        });
    }

    public async insert(obj: RegistrationDto): Promise<RegistrationDto> {
        let count = await this.counterRepository.getNextSequenceValue('registration_tbl');
        obj.id = count; 
        return this.col.insertMany([obj]);
    }

    public async delete(obj: RegistrationDto): Promise<RegistrationDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: RegistrationDto[] = [];
        return Object.assign<RegistrationDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: RegistrationDto): Promise<RegistrationDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  { "thanhtoan" : true } }))
        if(err) {
            return Promise.reject(err);
        }

        let result: RegistrationDto[] = [];
        return Object.assign<RegistrationDto[], mongoose.Document[]>(result, data);
    }

    public async cancel(obj: any): Promise<any>
    {
        let [err, data] = await to(this.col.find({ "madkkb": obj.madkkb}));
        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }
        let malkb = data[0].malichkb;
        if(malkb != null)
        {
            let [err, data] = await to(this.colScheduler.updateMany({ "id": malkb}, { $set:  { "reserve" : false } }));
            if(err) {
                return new ResponseModel(Status._500, JSON.stringify(err), null);
            }
            return data;

        }
        else
        {
            return new ResponseModel(Status._400, "Not found id of scheduler");
        }
    }
}