import { DoctorRepository } from './../repository/DoctorRepository';
import { DoctorDto } from './../model/DoctorDto';
import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';


export interface DoctorService {
    insert(obj: DoctorDto): Promise<any>;
    delete(obj: DoctorDto): Promise<ResponseModel<any>>;
    update(obj: DoctorDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DoctorServiceImpl extends CoreService<DoctorDto, any> implements DoctorService {

    @inject(TYPES.DoctorRepository)
    protected mainRepository: DoctorRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
