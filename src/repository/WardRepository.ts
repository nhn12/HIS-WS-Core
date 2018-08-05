import { CounterRepository } from './CounterRepository';
import { WardSchema } from '../model/WardSchema';
import { WardDto } from '../model/WardDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';
import { MongoUtils } from '../util/mongo-utils';

export interface WardRepository {
    findAll(): Promise<WardDto[]>;
    insert(obj: any): Promise<WardDto[]>;
    delete(obj: WardDto): Promise<WardDto[]>; 
    update(obj: WardDto): Promise<WardDto[]>;  

}

@injectable()
export class WardRepositoryImpl extends CoreRepository<WardDto> implements WardRepository {
    public setPrimaryTable(): string {
        return 'ward_tbl'
    }
    public setSchema(): mongoose.Schema {
        return WardSchema;
    }

    public definedIndexs() {
        return ["name"];
    }

    public getJoinTable() {
        let ext = [];
        return [
            { $lookup: MongoUtils.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name') },
            ...ext];
    }
}