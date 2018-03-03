import { BlueprintScheduleDto } from './../model/BlueprintScheduleDto';
import { BlueprintScheduleRepository } from './../repository/BlueprintScheduleRepository';
import { ScheduleDto } from './../model/ScheduleDto';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import { SchedulePeriodDto } from './dto/SchedulePeriodDto';
import { ScheduleAbsoluteDto } from './dto/ScheduleAbsoluteDto';
import to from '../util/promise-utils';
import { ParseUtils } from '../util/parse-utils';


export interface ScheduleService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class ScheduleServiceImpl implements ScheduleService {
    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;

    @inject(TYPES.BlueprintScheduleRepository)
    private bluePrintRepository: BlueprintScheduleRepository;

    public async insert(obj: any): Promise<ResponseModel<any>> {
        if (!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        obj.mode = 'period';

        // Get list blueprint schedule
        let [errBlue, blueList] = await to<BlueprintScheduleDto[]>(this.bluePrintRepository.findAll());
        console.log("list", blueList);
        if (!blueList || blueList.length <= 0) {
            console.log("empty")
            return new ResponseModel(Status._500, "Blueprint schedule empty");
        }

        console.log("54354378-",blueList.length);
        // Split each blueprint
        let scheduleList:ScheduleDto[] = [];
        for(var i=0;i<blueList.length;i++){
            let pathDate: Date[] = ParseUtils.splitDate(obj.start_time, obj.end_time);
            pathDate.forEach(date => {
                let tempBlue = new SchedulePeriodDto();
                tempBlue.start_time = ParseUtils.convertStringTime(blueList[i].start_time, date);
                tempBlue.end_time = ParseUtils.convertStringTime(blueList[i].end_time, date);
                tempBlue.period = blueList[i].period.valueOf();

                let tempSchedule = this.insertPeriod(tempBlue);
                tempSchedule = tempSchedule.map(value=>{
                    value.specialization_id = blueList[i].specialization_id;
                    value.ward_id = blueList[i].ward_id;
                    value.period = value.period.valueOf()/1000;
                    return value;
                });

                scheduleList.push(...tempSchedule);
            })
        }

        console.log(scheduleList);
        this.scheduleRepository.insert(scheduleList);
        return new ResponseModel(Status._200, "lack of data"); 
    }

    public async update(obj: any): Promise<ResponseModel<any>> {
        throw new Error("Method not implemented.");
    }

    private insertAbsolute(obj: ScheduleAbsoluteDto): ScheduleDto[] {
        let schedule: ScheduleDto = new ScheduleDto();

        schedule.start_time = obj.start_time;
        schedule.end_time = obj.end_time;
        return [schedule];

    }

    private insertPeriod(obj: SchedulePeriodDto): ScheduleDto[] {
        obj.start_time = new Date(obj.start_time);
        obj.end_time = new Date(obj.end_time);
        let distance = obj.end_time.getTime() - obj.start_time.getTime();
        obj.unit_period = 'm';
        if (obj.unit_period == 'h') {
            obj.period = obj.period * 60 * 60 * 1000;
        }

        if (obj.unit_period == 'm') {
            obj.period = obj.period * 60 * 1000;
        }

        let count = distance / obj.period;
        let schedule: ScheduleDto[] = [];
        for (var i = 0; i < count; i++) {
            let tempSchedule = new ScheduleDto();

            tempSchedule.is_interval = true;
            tempSchedule.period = obj.period;

            tempSchedule.start_time = new Date(obj.start_time.getTime() + obj.period * i);
            tempSchedule.end_time = new Date(obj.start_time.getTime() + obj.period * (i + 1));

            schedule.push(tempSchedule);
        }

        return schedule;


    }





}
