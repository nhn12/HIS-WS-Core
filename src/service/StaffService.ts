import {injectable} from 'inversify';
import 'reflect-metadata';
import { ResponseModel } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';
import { StaffDto } from '../model/StaffDto';


export interface StaffService {
    insert(obj: StaffDto): Promise<any>;
    insertMany(obj: StaffDto[]): Promise<any>;
    delete(obj: StaffDto): Promise<ResponseModel<any>>;
    update(obj: StaffDto): Promise<ResponseModel<any>>;
}

@injectable()
export class StaffServiceImpl extends CoreService<any, any> implements StaffService {
    public registerServiceName() {
        return "staff";
    }
}
