import { ProvinceDto } from './../model/ProvinceDto';
import { ProvinceSchema } from './../model/ProvinceSchema';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';


export interface ProvinceRepository {
    insert(obj: any[]): Promise<ProvinceDto[]>;
    delete(obj: ProvinceDto): Promise<ProvinceDto[]>; 
    update(obj: ProvinceDto): Promise<ProvinceDto[]>;  
}

@injectable()
export class ProvinceRepositoryImpl extends CoreRepository<ProvinceDto> implements ProvinceRepository {
    public setPrimaryTable(): string {
        return 'province_tbl'
    }
    public setSchema(): mongoose.Schema {
        return ProvinceSchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}