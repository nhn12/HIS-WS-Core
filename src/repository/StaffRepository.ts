import { StaffDto } from '../model/StaffDto';
import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { StaffSchema } from '../model/StaffSchema';
import { CoreRepository } from '../core/CoreRepository';


export interface StaffRepository {
    insert(obj: StaffDto[]): Promise<StaffDto[]>;
    delete(obj: StaffDto): Promise<StaffDto[]>; 
    update(obj: StaffDto): Promise<StaffDto[]>;  
    findOneBy(condition: any): Promise<StaffDto>;
}

@injectable()
export class StaffRepositoryImpl extends CoreRepository<StaffDto> implements StaffRepository {
    public setPrimaryTable(): string {
        return 'staff_tbl'
    }

    public setSchema(): mongoose.Schema {
        return StaffSchema;
    }

    public async getStaffByHospital(hopitalId: Number): Promise<StaffDto> {
        return this.findOneBy({hospital_id: hopitalId})
    }

    public definedIndexs() {
        return ["name"];
    }
}