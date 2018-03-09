import { DoctorDto } from './../model/DoctorDto';
import { CounterRepository } from './CounterRepository';
import {injectable, inject} from 'inversify';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import 'reflect-metadata';
import * as _ from 'lodash';
import TYPES from '../types';
import to from './../util/promise-utils';
import { DoctorSchema } from '../model/DoctorSchema';
import { CoreRepository } from '../core/CoreRepository';

export interface DoctorRepository {
    findAll(): Promise<Array<DoctorDto>>;
    insert(obj: any[]): Promise<DoctorDto[]>;
    delete(obj: DoctorDto): Promise<DoctorDto[]>; 
    update(obj: DoctorDto): Promise<DoctorDto[]>;
}

@injectable()
export class DoctorRepositoryImpl extends CoreRepository<DoctorDto> implements DoctorRepository {

    public setCounterRepository(): CounterRepository {
        return null;
        //throw new Error("Method not implemented.");
    }
    public setPrimaryTable(): string {
        return 'doctor_tbl'
    }

    public setSchema(): mongoose.Schema {
        return DoctorSchema;
    }
    
    public async insert(obj: DoctorDto[]): Promise<DoctorDto[]> {
        if(obj) {
            obj.forEach(element=>{
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