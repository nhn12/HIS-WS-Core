import { StaffAccountDto } from '../model/StaffAccountDto';
import {injectable} from 'inversify';
import 'reflect-metadata';
import { ResponseModel } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';
import { StaffDto } from '../model/StaffDto';
import { MessageConst } from '../util/message-const';


export interface StaffAccountService {
    insert(obj: StaffAccountDto): Promise<any>;
    insertMany(obj: StaffAccountDto[]): Promise<any>;
    delete(obj: StaffAccountDto): Promise<ResponseModel<any>>;
    update(obj: StaffAccountDto): Promise<ResponseModel<any>>;
    getOne(obj: any): Promise<ResponseModel<StaffAccountDto>>
}

@injectable()
export class StaffAccountServiceImpl extends CoreService<any, any> implements StaffAccountService {
    public registerServiceName() {
        return "StaffAccount";
    }

    public async insert(account: StaffAccountDto) {
        
        let data = await this.repository.findOneBy({username: account.username});
        if(data != null) {
            return Promise.reject(this.responseUtils.buildErrorData('ERR_006'));
        }
        return super.insert(account);
    }
}
