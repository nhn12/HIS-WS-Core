import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { TypeDto } from '../model/TypeDto';
import { TypeRepository } from '../repository/TypeRepository';
import { CoreService } from '../core/CoreService';


export interface TypeService {
    insert(obj: TypeDto): Promise<any>;
    insertMany(obj: TypeDto[]): Promise<any>;
    delete(obj: TypeDto): Promise<ResponseModel<any>>;
    update(obj: TypeDto): Promise<ResponseModel<any>>;
}

@injectable()
export class TypeServiceImpl extends CoreService<any, any> implements TypeService {
    public registerServiceName() {
        return "type";
    }
}
