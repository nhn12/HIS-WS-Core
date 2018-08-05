import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { TypeDto } from '../model/TypeDto';
import { TypeSchema } from '../model/TypeSchema';
import { CoreRepository } from '../core/CoreRepository';


export interface TypeRepository {
    insert(obj: any[]): Promise<TypeDto[]>;
    delete(obj: TypeDto): Promise<TypeDto[]>; 
    update(obj: TypeDto): Promise<TypeDto[]>;  
}

@injectable()
export class TypeRepositoryImpl extends CoreRepository<TypeDto> implements TypeRepository {
    public setPrimaryTable(): string {
        return 'type_tbl'
    }
    public setSchema(): mongoose.Schema {
        return TypeSchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}