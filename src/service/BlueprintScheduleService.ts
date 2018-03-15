import { BlueprintScheduleRepository } from './../repository/BlueprintScheduleRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { BlueprintScheduleDto } from '../model/BlueprintScheduleDto';


export interface BlueprintScheduleService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: BlueprintScheduleDto): Promise<ResponseModel<any>>;
    update(obj: BlueprintScheduleDto): Promise<ResponseModel<any>>;
}

@injectable()
export class BlueprintScheduleServiceImpl implements BlueprintScheduleService {
    @inject(TYPES.BlueprintScheduleRepository)
    private scheduleRepository: BlueprintScheduleRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err));
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: BlueprintScheduleDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: BlueprintScheduleDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
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
