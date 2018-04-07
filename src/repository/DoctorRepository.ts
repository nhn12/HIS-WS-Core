import { QueryResultDto } from './../model/QueryResultDto';
import { MongoUtils } from './../util/MongoUtils';
import { DoctorDto } from './../model/DoctorDto';
import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import 'reflect-metadata';
import * as _ from 'lodash';
import TYPES from '../types';
import to from './../util/promise-utils';
import { DoctorSchema } from '../model/DoctorSchema';
import { CoreRepository } from '../core/CoreRepository';

export interface DoctorRepository {
    query(filter: any, sort: any, skip: number, limit: number, ext?: any): Promise<QueryResultDto>
    findAll(): Promise<Array<DoctorDto>>;
    insert(obj: any[]): Promise<DoctorDto[]>;
    delete(obj: DoctorDto): Promise<DoctorDto[]>;
    update(obj: DoctorDto): Promise<DoctorDto[]>;
}

@injectable()
export class DoctorRepositoryImpl extends CoreRepository<DoctorDto> implements DoctorRepository {

    public setPrimaryTable(): string {
        return 'doctor_tbl'
    }

    public setSchema(): mongoose.Schema {
        return DoctorSchema;
    }

    public definedIndexs() {
        return ["name"];
    }

    protected getJoinTable(): any[] {
        let ext = [];
        return [
            { $lookup: MongoUtils.generateSubQueries('type_tbl', 'gender', 'code', 'gender_name', ext, [{ $eq: ['$class', 'GENDER'] }], 'name') },
            { $lookup: MongoUtils.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name') },
            ...ext];
    }

    public async insert(obj: DoctorDto[]): Promise<DoctorDto[]> {
        if (obj) {
            obj.forEach(element => {
                element.name = element.firstname + " " + element.lastname;
            })
        }
        return super.insert(obj);

    }

    public async update(obj: DoctorDto): Promise<DoctorDto[]> {
        obj.name = obj.firstname + " " + obj.lastname;
        return super.update(obj);

    }


}