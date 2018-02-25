import { BlueprintScheduleRepository } from './../repository/BlueprintScheduleRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';


export interface BlueprintScheduleService {
    insert(obj: any): Promise<any>;
    update(obj: any): Promise<any>;
    delete(obj: any): Promise<any>;
}

@injectable()
export class BlueprintScheduleServiceImpl implements BlueprintScheduleService {
    @inject(TYPES.BlueprintScheduleRepository)
    private scheduleRepository: BlueprintScheduleRepository;


    public async insert(obj: any): Promise<any> {
        return await this.scheduleRepository.insert([obj]);
    }

    public async update(obj: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async delete(obj: any): Promise<any> {
        return await this.scheduleRepository.delete(obj);
    }

    // private insertAbsolute(obj:ScheduleAbsoluteDto): ScheduleDto[] {
    //     let schedule: ScheduleDto = new ScheduleDto();

    //     schedule.start_time = obj.start_time;
    //     schedule.end_time = obj.end_time;

    //     return [schedule];

    // }

    // private insertPeriod(obj:SchedulePeriodDto): ScheduleDto[] {
    //     obj.start_time = new Date(obj.start_time);
    //     obj.end_time = new Date(obj.end_time);
    //     let distance = obj.end_time.getTime() - obj.start_time.getTime();

    //     if(obj.unit_period == 'h') {
    //         obj.period = obj.period*60*60*1000;
    //     }

    //     if(obj.unit_period == 'm') {
    //         obj.period = obj.period*60*1000;
    //     }

    //     let count = distance/obj.period;
    //     let schedule: ScheduleDto[] = [];
    //     for(var i = 0; i < count; i++) {
    //         let tempSchedule = new ScheduleDto();

    //         tempSchedule.is_interval = true;
    //         tempSchedule.period = obj.period;

    //         tempSchedule.start_time = new Date(obj.start_time.getTime() + obj.period*i);
    //         tempSchedule.end_time = new Date(obj.start_time.getTime() + obj.period*(i+1));

    //         schedule.push(tempSchedule);
    //     }

    //     return schedule;


    // }




 
}
