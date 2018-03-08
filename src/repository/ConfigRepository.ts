import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { ConfigDto } from '../model/ConfigDto';
import { ConfigSchema } from '../model/ConfigSchema';
import { CoreRepository } from '../core/CoreRepository';


export interface ConfigRepository {
    insert(obj: any[]): Promise<ConfigDto[]>;
    delete(obj: ConfigDto): Promise<ConfigDto[]>; 
    update(obj: ConfigDto): Promise<ConfigDto[]>;  
    findOne(obj: any): Promise<ConfigDto>;
    upsert(obj, condition?: any): Promise<ConfigDto>;
}

@injectable()
export class ConfigRepositoryImpl extends CoreRepository<ConfigDto> implements ConfigRepository {
    public setPrimaryTable(): string {
        return 'config_tbl'
    }
    public setSchema(): mongoose.Schema {
        return ConfigSchema;
    }
}