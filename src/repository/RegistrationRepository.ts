import { RegistrationDto } from './../model/RegistrationDto';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { CounterRepository } from './CounterRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import * as mongoose from 'mongoose';
import to from './../util/promise-utils';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { SchedulerSchema } from '../model/ScheduleSchema';
import { CoreRepository } from '../core/CoreRepository';


export interface RegistrationRepository {
    findAll(): Promise<Array<RegistrationDto>>;
    findOneBy(condition: any): Promise<RegistrationDto>
    insert(obj: RegistrationDto[]): Promise<RegistrationDto[]>;
    delete(obj: RegistrationDto): Promise<RegistrationDto[]>; 
    update(obj: RegistrationDto): Promise<RegistrationDto[]>; 
    //cancel(obj: any): Promise<any>; 
}

@injectable()
export class RegistrationRepositoryImpl extends CoreRepository<RegistrationDto> implements RegistrationRepository  {

    public setPrimaryTable(): string {
        return "registration_tbl"
    }
    public setSchema(): mongoose.Schema {
        return RegistrationSchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}