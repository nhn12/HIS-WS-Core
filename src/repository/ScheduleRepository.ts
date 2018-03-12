import {injectable, inject} from 'inversify';
import * as mongoose from 'mongoose';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { RegistrationDto } from '../model/RegistrationDto';
import { SchedulerSchema } from '../model/ScheduleSchema';
import { ScheduleDto } from '../model/ScheduleDto';
import to from './../util/promise-utils';
import { ResponseModel, Status } from '../model/ResponseDto';
import { Schema } from 'mongoose';
import { CounterRepository } from './CounterRepository';
import TYPES from '../types';


export interface ScheduleRepository {
    findAll(): Promise<Array<ScheduleDto>>;
    insert(obj: any[]): Promise<ScheduleDto[]>;
    delete(obj: ScheduleDto): Promise<ScheduleDto[]>; 
    update(obj: ScheduleDto): Promise<ScheduleDto[]>;
    findOne(id: String): Promise<any>;
}

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    col:mongoose.Model<any>;

    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    constructor() {

        this.col = mongoose.model('schedule_tbl', SchedulerSchema, 'schedule_tbl' );
    }

    public async findAll(): Promise<Array<ScheduleDto>> {
        let data = await this.col.find();
        let result: ScheduleDto[] = [];
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any[]): Promise<ScheduleDto[]> {
        let result: ScheduleDto[] = [];
        
        let seq = await this.counterRepository.getNextSequenceValue("schedule_tbl", obj.length);

        obj.map(element=>{
            element.id = seq++;
        })

        let data = await this.col.insertMany(obj);


        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: ScheduleDto): Promise<ScheduleDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: ScheduleDto[] = [];
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: ScheduleDto): Promise<ScheduleDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: ScheduleDto[] = [];
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async findOne(id: String): Promise<any>
    {
        let [err, data] = await to(this.col.find({ "id": id}));
        if(err) {
            return Promise.reject(err);
        }
        else
            return data
    }
}