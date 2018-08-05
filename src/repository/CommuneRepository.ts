import { CommuneSchema } from '../model/CommuneSchema';
import { CommuneDto } from '../model/CommuneDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';


export interface CommuneRepository {
    insert(obj: any[]): Promise<CommuneDto[]>;
    delete(obj: CommuneDto): Promise<CommuneDto[]>; 
    update(obj: CommuneDto): Promise<CommuneDto[]>;  
}

@injectable()
export class CommuneRepositoryImpl extends CoreRepository<CommuneDto> implements CommuneRepository {
    public setPrimaryTable(): string {
        return 'commune_tbl'
    }
    public setSchema(): mongoose.Schema {
        return CommuneSchema;
    }
    public definedIndexs() {
        return null;
    }
}