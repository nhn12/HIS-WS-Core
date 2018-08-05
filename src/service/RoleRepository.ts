import { RoleDto } from '../model/RoleDto';
import {injectable} from 'inversify';
import 'reflect-metadata';
import { ResponseModel } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';


export interface RoleService {
    insert(obj: RoleDto): Promise<any>;
    insertMany(obj: RoleDto[]): Promise<any>;
    delete(obj: RoleDto): Promise<ResponseModel<any>>;
    update(obj: RoleDto): Promise<ResponseModel<any>>;
}

@injectable()
export class RoleServiceImpl extends CoreService<any, any> implements RoleService {
    public registerServiceName() {
        return "role";
    }
}
