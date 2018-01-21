import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import { SchedulePeriodDto } from './dto/SchedulePeriodDto';
import { ScheduleAbsoluteDto } from './dto/ScheduleAbsoluteDto';
import to from '../util/promise-utils';


export interface WardService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class WardServiceImpl implements WardService {
    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        // if(!obj) {
        //     return new ResponseModel(Status._400, "lack of data");
        // }
        // console.log(obj);
        // let schedules: ScheduleDto[] = [];
        // switch(obj.mode) {
        //     case 'abs':
        //         schedules = this.insertAbsolute(obj);
        //         break;
        //     case 'period':
        //         schedules = this.insertPeriod(obj);
        //         break;
        // }
        // console.log(schedules);
        // let [err, result] = to(await this.scheduleRepository.insert(schedules));
        // if(err) {
        //     return new ResponseModel(Status._500, "err");
        // }

        return new ResponseModel(Status._200, "success", {});
    }

    public async update(obj: any): Promise<ResponseModel<any>> {
        throw new Error("Method not implemented.");
    }

  




 
}
