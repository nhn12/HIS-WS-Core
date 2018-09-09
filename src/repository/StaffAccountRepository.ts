import { StaffRepository } from './StaffRepository';
import { StaffAccountDto } from '../model/StaffAccountDto';
import { StaffDto } from '../model/StaffDto';
import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from '../util/promise-utils';
import { StaffSchema } from '../model/StaffSchema';
import { CoreRepository } from '../core/CoreRepository';
import { StaffAccountSchema } from '../model/StaffAccountSchema';


export interface StaffAccountRepository {
    insert(obj: StaffAccountDto[]): Promise<StaffAccountDto[]>;
    delete(obj: StaffAccountDto): Promise<StaffAccountDto[]>; 
    update(obj: StaffAccountDto): Promise<StaffAccountDto[]>;  
    findOneBy(condition: any): Promise<StaffAccountDto>;
    getAccountByHospitaId(hospitalId: number): Promise<StaffAccountDto>;
}

@injectable()
export class StaffAccountRepositoryImpl extends CoreRepository<StaffAccountDto> implements StaffAccountRepository {

    @inject(TYPES.StaffRepository)
    private staffRepo: StaffRepository;


    public setPrimaryTable(): string {
        return 'staff_account_tbl'
    }
    public setSchema(): mongoose.Schema {
        return StaffAccountSchema;
    }

    public async getAccountByHospitaId(hospital_id: number) {
       let staff =  await this.staffRepo.findOneBy({hospital_id: hospital_id});
       
       let account: StaffAccountDto = await this.findOneBy({staff_id: staff.id});
       
       account.staff = staff;
       return account;
    }

    public definedIndexs() {
        return ["name"];
    }
}