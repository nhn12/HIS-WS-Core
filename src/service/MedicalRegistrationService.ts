import { RegistrationRepository } from './../repository/RegistrationRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { ResponseModel, Status } from '../model/ResponseDto';
import  to  from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface MedicalRegistrationService {
    insert(obj: RegistrationDto): Promise<ResponseModel<any>>;
    getone(id: string): Promise<ResponseModel<any>>
    delete(obj: RegistrationDto): Promise<ResponseModel<any>>;
    update(obj: RegistrationDto): Promise<ResponseModel<any>>;
}

@injectable()
export class MedicalRegistrationServiceImpl extends CoreService<RegistrationDto, any> implements MedicalRegistrationService {
    @inject(TYPES.RegistrationRepository)
    private registrationRepo: RegistrationRepository;

    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;

    public setMainRepository() {
        return this.registrationRepo;
    }

    public async getone(id: any) {
        let [err, response] = await to(this.registrationRepo.findOne({madkkb: id}));
        if(err) {
            return new ResponseModel(Status._500, err);
        }

        return response;
    }


    public async insert(obj: RegistrationDto): Promise<ResponseModel<any>> {
            obj.created_date = obj.updated_date =  Date.now();
            obj.deleted_flag = false;
            //obj.mabv = mabv;

            let [errSchedule, dataSchedule] = await to(this.scheduleRepository.findOne(obj.malichkb.toString()));
            if(errSchedule) {
                return new ResponseModel(Status._500, JSON.stringify(errSchedule), null);
            }

            
            if(dataSchedule && dataSchedule.length <= 0 && dataSchedule[0].reserve == false)
            {
                dataSchedule[0].reserve = true;
                console.log(dataSchedule[0]);
                let [err, result] = await to(this.scheduleRepository.update(dataSchedule[0]));
                if(err) 
                {
                    return new ResponseModel(Status._500, "err");
                }
                else
                {
                    const [errRegis, response] = await to(super.insert(obj));
                    if(errRegis) {
                        return new ResponseModel(Status._500, JSON.stringify(errRegis));
                    }
    
                    if(response) {
                        return new ResponseModel(Status._200, response[0]);
                    }
                }
            }
            else
            {
                return new ResponseModel(Status._200, "Implement later");
                //to do find scheduler 
            }
            
            
    }

    public async delete(obj: RegistrationDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.registrationRepo.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

}
