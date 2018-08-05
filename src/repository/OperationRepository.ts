import { OperationSchema } from '../model/OperationSchema';
import { ProvinceDto } from '../model/ProvinceDto';
import { ProvinceSchema } from '../model/ProvinceSchema';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import { CoreRepository } from '../core/CoreRepository';
import { OperationDto } from '../model/OperationDto';


export interface OperationRepository {
    insert(obj: any[]): Promise<OperationDto[]>;
    delete(obj: OperationDto): Promise<OperationDto[]>; 
    update(obj: OperationDto): Promise<OperationDto[]>;  
}

@injectable()
export class OperationRepositoryImpl extends CoreRepository<OperationDto> implements OperationRepository {
    public setPrimaryTable(): string {
        return 'operation_tbl'
    }
    public setSchema(): mongoose.Schema {
        return OperationSchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}