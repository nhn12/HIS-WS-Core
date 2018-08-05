import { StaffAccountDto } from '../model/StaffAccountDto';
import { StaffDto } from '../model/StaffDto';
import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { StaffSchema } from '../model/StaffSchema';
import { CoreRepository } from '../core/CoreRepository';
import { StaffAccountSchema } from '../model/StaffAccountSchema';


export interface StaffAccountRepository {
    insert(obj: StaffAccountDto[]): Promise<StaffAccountDto[]>;
    delete(obj: StaffAccountDto): Promise<StaffAccountDto[]>; 
    update(obj: StaffAccountDto): Promise<StaffAccountDto[]>;  
    findOneBy(condition: any): Promise<StaffAccountDto>;
}

@injectable()
export class StaffAccountRepositoryImpl extends CoreRepository<StaffAccountDto> implements StaffAccountRepository {
    public setPrimaryTable(): string {
        return 'staff_account_tbl'
    }
    public setSchema(): mongoose.Schema {
        return StaffAccountSchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}