import { LogSchema } from './../model/LogSchema';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { ConfigSchema } from '../model/ConfigSchema';
import { CoreRepository } from '../core/CoreRepository';
import { LogDto } from '../model/LogDto';


export interface LogRepository {
    insert(obj: any[]): Promise<LogDto[]>;
    delete(obj: LogDto): Promise<LogDto[]>; 
    update(obj: LogDto): Promise<LogDto[]>;  
}

@injectable()
export class LogRepositoryImpl extends CoreRepository<LogDto> implements LogRepository {
    public setPrimaryTable(): string {
        return 'log_tbl'
    }
    public setSchema(): mongoose.Schema {
        return LogSchema;
    }
}