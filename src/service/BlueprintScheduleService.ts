import { BlueprintScheduleRepository } from './../repository/BlueprintScheduleRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { BlueprintScheduleDto } from '../model/BlueprintScheduleDto';
import { CoreService } from '../core/CoreService';


export interface BlueprintScheduleService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: BlueprintScheduleDto): Promise<ResponseModel<any>>;
    update(obj: BlueprintScheduleDto): Promise<ResponseModel<any>>;
}

@injectable()
export class BlueprintScheduleServiceImpl extends CoreService<BlueprintScheduleDto, any> implements BlueprintScheduleService {
    public registerServiceName() {
        return "blueprintSchedule";
    }
}
