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
import { SyncService } from '../service/SyncService';
import { CoreService } from '../core/CoreService';


export interface ScheduleService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: ScheduleDto): Promise<ResponseModel<any>>;
    update(obj: ScheduleDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ScheduleServiceImpl extends CoreService<ScheduleDto, any> implements ScheduleService {
    @inject(TYPES.BlueprintScheduleRepository)
    private bluePrintRepository: BlueprintScheduleRepository;

    public registerServiceName() {
        return "schedule";
    }


    public async insert(obj: any): Promise<ResponseModel<any>> {
        if (!obj  || obj.start_time == null || obj.end_time == null || !obj.hospital_id) {
            return new ResponseModel(Status._400, "lack of ward_id data");
        }
        obj.mode = 'period';
        // Get list blueprint schedule
        let [errBlue, blueList] = await to<BlueprintScheduleDto[]>(this.bluePrintRepository.findAll());
        if (!blueList || blueList.length <= 0) {
            return new ResponseModel(Status._500, "Blueprint schedule empty");
        }
        // Split each blueprint
        let scheduleList: ScheduleDto[] = [];
        for (let i = 0; i < blueList.length; i++) {
            let pathDate: Date[] = ParseUtils.splitDate(obj.start_time, obj.end_time);
            pathDate.forEach(date => {
                let tempBlue = new SchedulePeriodDto();
                tempBlue.start_time = ParseUtils.convertStringTime(blueList[i].start_time, date);
                tempBlue.end_time = ParseUtils.convertStringTime(blueList[i].end_time, date);
                tempBlue.period = blueList[i].period.valueOf();

                let tempSchedule = this.insertPeriod(tempBlue);
                tempSchedule = tempSchedule.map(value => {
                    value.specialization_id = blueList[i].specialization_id;
                    value.ward_id = blueList[i].ward_id;
                    value.period = value.period.valueOf() / 60000;
                    value.hospital_id = obj.hospital_id;
                    return value;
                });

                scheduleList.push(...tempSchedule);
            });
        }
        await this.repository.insert(scheduleList);
        return new ResponseModel(Status._200, "success", scheduleList);
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

    public Sync(obj: any) {
        console.log("sync");
        console.log(obj);

        function groupBy(array, f) {
            var groups = {};
            array.forEach(function (o) {
                var group = JSON.stringify(f(o));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function (group) {
                return groups[group];
            })
        }

        // var result = groupBy(obj, function(item)
        // {
        // return item.ward_id;
        // });

        var lstItemSync = new Array();
        obj.forEach(element => {
            var itemSync = {
                //"is_interval": item.is_interval,
                //"period": item.period,
                "HISRoomId": element.ward_id,
                "HisId": element.id,
                "Date": ParseUtils.convertToFormatDateSync(element.start_time),
                "StartTime": ParseUtils.convertToFormatTimeSync(element.start_time)
                //"specialization_id": item.specialization_id,                                      
            };
            lstItemSync.push(itemSync);
        });

        //console.log(lstItemSync);
        // group by RoomID
        var itemSyncGroupByRoom = groupBy(lstItemSync, function (item) {
            return item.HISRoomId;
        });

        console.log(itemSyncGroupByRoom);

        itemSyncGroupByRoom.forEach(element => {
            // group by Date
            var ItemSyncGroupByDate = groupBy(element, function (item) {
                return item.Date;
            });
            console.log("item");
            console.log(ItemSyncGroupByDate);

            ItemSyncGroupByDate.forEach(element => {
                var schedulers = new Array();
                let No = 0;
                element.forEach(item => {
                    No = No + 1;
                    var scheduler = {
                        "HisId": item.HisId.toString(),
                        "StartTime": item.StartTime.toString(),
                        "No": No,
                    };
                    schedulers.push(scheduler);
                });
                var scheduleSyncDTO = {
                    "HISRoomId": element[0].HISRoomId.toString(),
                    "Date": element[0].Date.toString(),
                    "Schedules": schedulers,
                };

                console.log("item Sync");
                console.log(scheduleSyncDTO);
                //open comment when use sync()
                //this.syncService.sync(scheduleSyncDTO, "HISRoomSchedule/Create", null);

            });
        });



    }





}
