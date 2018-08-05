import { CounterRepository } from './../repository/CounterRepository';
import { ScheduleDto } from './../model/ScheduleDto';
import { ScheduleRepository } from './../repository/ScheduleRepository';
import { inject } from 'inversify';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { RegistrationDto } from '../model/RegistrationDto';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';
import TYPES from '../types';
import { ResponseUtil } from '../util/response-utils';

export interface RegistrationService {
    insert(obj: RegistrationDto): Promise<ResponseModel<any>>;
    delete(obj: RegistrationDto): Promise<ResponseModel<any>>;
    update(obj: RegistrationDto): Promise<ResponseModel<any>>;
    query(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class RegistrationServiceImpl extends CoreService<RegistrationDto, any> implements RegistrationService {
    @inject(TYPES.ScheduleRepository)
    protected scheduleRepo: ScheduleRepository;

    @inject(TYPES.CounterRepository)
    protected countRepo: CounterRepository;

    public registerServiceName() {
        return "registration";
    }

    public async insert(obj: RegistrationDto) {

        if (!obj || !obj.mabv || !obj.mack) {
            return this.responseUtils.buildErrorData('ERR_001');
        }
        let response = await this.scheduleRepo.query({
            $and: [
                { specialization_id: parseInt(obj.mack) },
                { hospital_id: parseInt(obj.mabv) },
                { deleted_flag: false },
                { reserve: false }
            ]
        }, { start_time: 1 }, 0, 10, {});
        obj["_id"] = obj["_rev"] = undefined;
        let count = await this.countRepo.getNextSequenceValue("idservice");
        if (response[0].data.length <= 0) {
            obj.is_accept = false;
            obj.is_bvcancel = true;
            let registation: ResponseModel<RegistrationDto> = await super.insert(obj);
            registation.data[0].iddkkb = registation.data[0].id;
            registation.data[0].lidotuchoi = "Xin lỗi. Hệ thống không tìm thấy lịch khám phù hợp.";
            return new ResponseModel(Status._200, null, { action: 'rj', idservice: count, data: registation.data[0] });
        }

        obj.tenpk = response[0].data[0].ward_name;
        obj.tenck = response[0].data[0].specialization_name;
        obj.ngaykb = response[0].data[0].start_time;
        obj.gia = 200000;
        obj.stt = 20;
        obj.is_accept = true;
        obj.is_bvcancel = false;
        obj.malichkb = response[0].data[0].id;


        let registation: ResponseModel<RegistrationDto> = await super.insert(obj);

        registation.data[0].iddkkb = registation.data[0].id;
        let schedule = new ScheduleDto();
        schedule.id = response[0].data[0].id;
        schedule.reserve = true;
        await this.scheduleRepo.update(schedule);
        return new ResponseModel(Status._200, null, { action: '02', idservice: count, data: registation.data[0] });
    }
}
