import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { RegistrationRepository } from '../repository/RegistrationRepository';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { ResponseModel, Status } from '../model/ResponseDto';
import  to  from '../util/promise-utils';

export interface MedicalRegistrationService {
    getAllRegistration();
    insert(obj: RegistrationDto): Promise<ResponseModel<any>>;
    delete(obj: RegistrationDto): Promise<ResponseModel<any>>;
    update(obj: RegistrationDto): Promise<ResponseModel<any>>;
    cancel(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class MedicalRegistrationServiceImpl implements MedicalRegistrationService {
    @inject(TYPES.RegistrationRepository)
    private registrationRepo: RegistrationRepository;
    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;


    public async getAllRegistration(): Promise<Array<RegistrationDto>> {
        // grab addresses from mongo
        var re = this.registrationRepo.findAll().then(result=>{return result});
        return re;
    }

    public async insert(obj: RegistrationDto): Promise<ResponseModel<any>> {
        return new Promise<ResponseModel<any>>(async (resolve, reject)=>{
            // if(!mabv) {
            //     resolve(new ResponseModel(Status._0, "mabv is required"));
            //     return;
            // }

            // if(!obj.madkkb) {
            //     resolve(new ResponseModel(Status._0, "madkkb is required"));
            //     return;
            // }
            console.log(obj);
            obj.created_date = obj.updated_date =  Date.now();
            obj.deleted_flag = false;
            //obj.mabv = mabv;

            let [errSchedule, dataSchedule] = await to(this.scheduleRepository.findOne(obj.malichkb.toString()));
            if(errSchedule) {
            return new ResponseModel(Status._500, JSON.stringify(errSchedule), null);
            }
            
            if(dataSchedule[0].reserve == false)
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
                    const [errRegis, response] = await to(this.registrationRepo.insert(obj));
                    if(errRegis) {
                        resolve(new ResponseModel(Status._500, "error"));
                        return;
                    }
    
                    if(response) {
                        resolve(new ResponseModel(Status._200, "success"));
                        return;
                    }
                }
            }
            else
            {
                //to do find scheduler 
            }
            
            
        })
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

    public async update(obj: RegistrationDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.registrationRepo.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async cancel(obj: any): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }

        let [err, result] = await to(this.registrationRepo.cancel(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }
}
