import { CounterRepository } from './CounterRepository';
import {injectable, inject} from 'inversify';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BlueprintScheduleDto } from '../model/BlueprintScheduleDto';
import { BlueprintScheduleSchema } from '../model/BlueprintScheduleSchema';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';


export interface BlueprintScheduleRepository {
    findAll(): Promise<Array<BlueprintScheduleDto>>;
    insert(obj: any[]): Promise<BlueprintScheduleDto[]>;
    delete(obj: any): Promise<boolean>;
}

@injectable()
export class BlueprintScheduleRepositoryImpl implements BlueprintScheduleRepository {
    col:mongoose.Model<any>;

    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    constructor() {

        this.col = mongoose.model('blueprint_schedule_tbl', BlueprintScheduleSchema, 'blueprint_schedule_tbl' );
    }

    public async findAll(): Promise<Array<BlueprintScheduleDto>> {
        let data = await this.col.find({deleted_flag: false});
        let result: BlueprintScheduleDto[] = [];
        return Object.assign<BlueprintScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any[]): Promise<BlueprintScheduleDto[]> {
        var count = await this.counterRepository.getNextSequenceValue('blueprint_schedule_tbl');
        obj[0].id = count;
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: BlueprintScheduleDto[] = [];
        return Object.assign<BlueprintScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: any): Promise<boolean> {
        let [err, response] = await to(new Promise((resolve, reject)=>{
            this.col.deleteOne(obj, ()=>{
                resolve(true);
            })
        }));
        console.log(response);
        if(err) {
            return Promise.reject(err);
        }
        return true;
    }
}