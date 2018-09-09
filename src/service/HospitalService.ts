import { StaffRepository } from '../repository/StaffRepository';
import { StaffAccountRepository } from '../repository/StaffAccountRepository';
import { StaffAccountService } from './StaffAccountService';
import { inject } from 'inversify';
import { HospitalDto } from '../model/HospitalDto';
import {injectable} from 'inversify';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';
import { MessageConst } from '../util/message-const';
import TYPES from '../types';
import to from '../util/promise-utils';
import { StaffDto } from '../model/StaffDto';
import { StaffAccountDto } from '../model/StaffAccountDto';


export interface HospitalService {
    insert(obj: HospitalDto): Promise<any>;
    insertMany(obj: HospitalDto[]): Promise<any>;
    delete(obj: HospitalDto): Promise<ResponseModel<any>>;
    update(obj: HospitalDto): Promise<ResponseModel<any>>;
}

@injectable()
export class HospitalServiceImpl extends CoreService<any, any> implements HospitalService {
    @inject(TYPES.StaffAccountRepository)
    private staffAccountService: StaffAccountRepository;

    @inject(TYPES.StaffRepository)
    private staffService: StaffRepository;

    public registerServiceName() {
        return "hospital";
    }

    public async update(obj: HospitalDto) {
        if(obj.status != null && obj.status != undefined) {
            let account: StaffAccountDto = await this.staffAccountService.getAccountByHospitaId(<number>obj.id);
            account.status = obj.status;
            this.staffAccountService.update(account);
        }
        return super.update(obj);
    }

    public async delete(obj: HospitalDto) {
        let staff = await this.staffService.findOneBy({hospital_id: obj.id});
        let account = await this.staffAccountService.getAccountByHospitaId(<number>obj.id);

        this.staffService.delete(staff);
        this.staffAccountService.delete(account);
        return super.delete(obj);
    }

    public async insert(obj: HospitalDto) {
        if(!obj) {
            return new ResponseModel(Status._500, 'ERR_004');
        }

        if(!obj) {
            return new ResponseModel(Status._500, 'ERR_005');
        }

        if(!obj.account.username || !obj.account.password) {
            return new ResponseModel(Status._500, 'ERR_007');
        }

        let [errorGetAccount, responseGetAccount] = await to(this.staffAccountService.findOneBy({username: obj.account.username}));
        if(errorGetAccount) {
            return new ResponseModel(Status._500, 'ERR_001', errorGetAccount);
        }

        if(responseGetAccount) {
            return new ResponseModel(Status._500, 'ERR_006');
        }

        obj.code = <string>obj.account.username;
        let [errorInsertBV, responseInsertBV] = await to<ResponseModel<HospitalDto>>(super.insert(obj));
        let bv: ResponseModel<HospitalDto> = responseInsertBV;
        if(errorInsertBV) {
            return new ResponseModel(Status._500, 'ERR_001', errorInsertBV);
        }

        // Insert staff fake
        let staffDto: StaffDto = new StaffDto();
        staffDto.hospital_id = bv.data.id;
        staffDto.email = bv.data.email;
        staffDto.name = bv.data.name;
        staffDto.role = 4;
        let [errorStaff, responseStaff] = await to<StaffDto[]>(this.staffService.insert([staffDto]));
        if(errorStaff) {
            return new ResponseModel(Status._500, 'ERR_001', errorStaff);
        }

        obj.account.staff_id = <number>responseStaff[0].id;
        let [errorInsertAccount, responseInsertAccount] = await to(this.staffAccountService.insert([obj.account]));

        if(errorInsertAccount) {
            return new ResponseModel(Status._500, 'ERR_001', errorInsertAccount);
        }

        if(!responseInsertAccount) {
            return new ResponseModel(Status._500, 'ERR_001', errorInsertAccount);
        }

        return responseInsertBV;
    }
}
