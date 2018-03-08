import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';
import { LogRepository } from '../repository/LogRepository';
import { LogDto } from '../model/LogDto';


export interface LogService {
    insert(obj: LogDto): Promise<any>;
    delete(obj: LogDto): Promise<ResponseModel<any>>;
    update(obj: LogDto): Promise<ResponseModel<any>>;
}

@injectable()
export class LogServiceImpl extends CoreService<LogDto, any> implements LogService {

    @inject(TYPES.LogRepository)
    protected mainRepository: LogRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
