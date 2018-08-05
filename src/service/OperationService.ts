import { OperationDto } from '../model/OperationDto';
import { RoleDto } from '../model/RoleDto';
import {injectable} from 'inversify';
import 'reflect-metadata';
import { ResponseModel } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';


export interface OperationService {
    insert(obj: OperationDto): Promise<any>;
    insertMany(obj: OperationDto[]): Promise<any>;
    delete(obj: OperationDto): Promise<ResponseModel<any>>;
    update(obj: OperationDto): Promise<ResponseModel<any>>;
}

@injectable()
export class OperationServiceImpl extends CoreService<any, any> implements OperationService {
    public registerServiceName() {
        return "operation";
    }
}
