import { DistrictDto } from './../model/DistrictDto';
import { DistrictSchema } from './../model/DistrictSchema';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';


export interface DistrictRepository {
    insert(obj: any[]): Promise<DistrictDto[]>;
    delete(obj: DistrictDto): Promise<DistrictDto[]>; 
    update(obj: DistrictDto): Promise<DistrictDto[]>;  
}

@injectable()
export class DistrictRepositoryImpl extends CoreRepository<DistrictDto> implements DistrictRepository {
    public setPrimaryTable(): string {
        return 'district_tbl'
    }
    public setSchema(): mongoose.Schema {
        return DistrictSchema;
    }
}