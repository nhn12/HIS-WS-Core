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


export interface ScheduleService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class ScheduleServiceImpl implements ScheduleService {
    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let schedules: ScheduleDto[] = [];
        switch(obj.mode) {
            case 'abs':
                schedules = this.insertAbsolute(obj);
                break;
            case 'period':
                schedules = this.insertPeriod(obj);
                break;
        }
        console.log(schedules);
        let [err, result] = to(await this.scheduleRepository.insert(schedules));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: any): Promise<ResponseModel<any>> {
        throw new Error("Method not implemented.");
    }

    private insertAbsolute(obj:ScheduleAbsoluteDto): ScheduleDto[] {
        let schedule: ScheduleDto = new ScheduleDto();

        schedule.start_time = obj.start_time;
        schedule.end_time = obj.end_time;

        return [schedule];

    }

    private insertPeriod(obj:SchedulePeriodDto): ScheduleDto[] {
        obj.start_time = new Date(obj.start_time);
        obj.end_time = new Date(obj.end_time);
        let distance = obj.end_time.getTime() - obj.start_time.getTime();

        if(obj.unit_period == 'h') {
            obj.period = obj.period*60*60*1000;
        }

        if(obj.unit_period == 'm') {
            obj.period = obj.period*60*1000;
        }

        let count = distance/obj.period;
        let schedule: ScheduleDto[] = [];
        for(var i = 0; i < count; i++) {
            let tempSchedule = new ScheduleDto();

            tempSchedule.is_interval = true;
            tempSchedule.period = obj.period;

            tempSchedule.start_time = new Date(obj.start_time.getTime() + obj.period*i);
            tempSchedule.end_time = new Date(obj.start_time.getTime() + obj.period*(i+1));

            schedule.push(tempSchedule);
        }

        return schedule;


    }




 
}
