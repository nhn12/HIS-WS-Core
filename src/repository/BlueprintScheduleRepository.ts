import { MongoUtils } from './../util/mongo-utils';
import { CounterRepository } from './CounterRepository';
import {injectable, inject} from 'inversify';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { BlueprintScheduleDto } from '../model/BlueprintScheduleDto';
import { BlueprintScheduleSchema } from '../model/BlueprintScheduleSchema';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';


export interface BlueprintScheduleRepository {
    findAll(): Promise<Array<BlueprintScheduleDto>>;
    insert(obj: any[]): Promise<BlueprintScheduleDto[]>;
    delete(obj: BlueprintScheduleDto): Promise<BlueprintScheduleDto[]>; 
    update(obj: BlueprintScheduleDto): Promise<BlueprintScheduleDto[]>;
}

@injectable()
export class BlueprintScheduleRepositoryImpl extends CoreRepository<BlueprintScheduleDto> implements BlueprintScheduleRepository {
    public setPrimaryTable(): string {
        return 'blueprint_schedule_tbl';
    }
    public setSchema(): mongoose.Schema {
        return BlueprintScheduleSchema;
    }
    public definedIndexs() {
        return null;
    }

    protected getJoinTable(): any[] {
        let ext = [];
        return [
            { $lookup: MongoUtils.generateSubQueries('doctor_tbl', 'doctor_id', 'id', 'doctor_name', ext, null, 'name') },
            { $lookup: MongoUtils.generateSubQueries('ward_tbl', 'ward_id', 'id', 'ward_name', ext, null, 'name') },
            { $lookup: MongoUtils.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name') },
            { $unwind: "$time" },
            MongoUtils.generateJoinTable('ward_tbl', 'time.ward_id', 'id', 'time.ward_obj') ,
            { $group : { _id : "$_id", time: { $push: "$time" } , "doctor_name": { "$first": "$doctor_name" },"id": { "$first": "$id" }, "specialization_name": { "$first": "$specialization_name" }, "date": { "$first": "$date" }}},
            ...ext];
    }
}