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


export interface DoctorService {
    insert(obj: DoctorDto): Promise<any>;
    delete(obj: DoctorDto): Promise<ResponseModel<any>>;
    update(obj: DoctorDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DoctorServiceImpl extends CoreService<DoctorDto, any> implements DoctorService {
    public registerServiceName() {
        return "doctor";
    }
}
