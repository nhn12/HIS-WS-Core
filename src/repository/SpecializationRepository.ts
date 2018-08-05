import { CounterRepository } from './CounterRepository';
import { SpecializationSchema } from '../model/SpecializationSchema';
import { SpecializationDto } from '../model/SpecializationDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';

export interface SpecializationRepository {
    insert(obj: any[]): Promise<SpecializationDto[]>;
    delete(obj: SpecializationDto): Promise<SpecializationDto[]>; 
    update(obj: SpecializationDto): Promise<SpecializationDto[]>; 
}

@injectable()
export class SpecializationRepositoryImpl extends CoreRepository<SpecializationDto> implements SpecializationRepository  {

    public setPrimaryTable() {
        return 'specialization_tbl';
    }
    public setSchema(): mongoose.Schema {
        return SpecializationSchema;
    }
    

    public definedIndexs() {
        return ["name"];
    }
}