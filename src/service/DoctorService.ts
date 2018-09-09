import { StaffAccountService } from './StaffAccountService';
import { DoctorRepository } from '../repository/DoctorRepository';
import { DoctorDto } from '../model/DoctorDto';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';
import { SyncService } from './SyncService';
import { StaffService } from './StaffService';
import { StaffAccountDto } from '../model/StaffAccountDto';
import { StaffDto } from '../model/StaffDto';


export interface DoctorService {
    insert(obj: DoctorDto): Promise<any>;
    delete(obj: DoctorDto): Promise<ResponseModel<any>>;
    update(obj: DoctorDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DoctorServiceImpl extends CoreService<DoctorDto, any> implements DoctorService {

    @inject(TYPES.StaffService)
    private staffService: StaffService;

    @inject(TYPES.StaffAccountService)
    private staffAccountService: StaffAccountService;

    public registerServiceName() {
        return "doctor";
    }

    public async insert(obj: DoctorDto) {
        let staffDto = new StaffDto();
        staffDto.name = obj.firstname + " " + obj.lastname;
        staffDto.hospital_id = obj.hospital_id[0];
        staffDto.role = 5;
        let responseStaff: ResponseModel<any> = await this.staffService.insert(staffDto);

        // Insert account
        let account = new StaffAccountDto();
        account.staff_id = responseStaff.data.id;
        account.username = obj.username;
        account.password = obj.password;
        let responseAccount: ResponseModel<StaffAccountDto> = await this.staffAccountService.insert(account);

        return super.insert(obj);
    }
}
