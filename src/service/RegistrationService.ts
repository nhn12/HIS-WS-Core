import { RegistrationRepository } from './../repository/RegistrationRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ScheduleRepository } from '../repository/ScheduleRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { ResponseModel, Status, STATUS_NAME } from '../model/ResponseDto';
import  to  from '../util/promise-utils';
import { CoreService } from '../core/CoreService';
import { CounterRepository } from '../repository/CounterRepository';
import { STATUS_CODES } from 'http';

export interface RegistrationService {
    insert(obj: RegistrationDto): Promise<ResponseModel<any>>;
    getone(id: string): Promise<ResponseModel<any>>
    delete(obj: RegistrationDto): Promise<ResponseModel<any>>;
    update(obj: RegistrationDto): Promise<ResponseModel<any>>;
    getBaNumber(): Promise<ResponseModel<string>>;
    getCvNumber(): Promise<ResponseModel<string>>;
}

@injectable()
export class RegistrationServiceImpl extends CoreService<RegistrationDto, any> implements RegistrationService {
    @inject(TYPES.RegistrationRepository)
    private registrationRepo: RegistrationRepository;

    @inject(TYPES.CounterRepository)
    private counterRpository: CounterRepository;

    @inject(TYPES.ScheduleRepository)
    private scheduleRepository: ScheduleRepository;

    public setMainRepository() {
        return this.registrationRepo;
    }

    public async getone(id: any) {
        let [err, response] = await to(this.registrationRepo.findOneBy({madkkb: id}));
        if(err) {
            return new ResponseModel(Status._500, err);
        }

        return response;
    }

    public async getBaNumber(): Promise<ResponseModel<string>> {
        let [err, response] = await to(this.counterRpository.getNextSequenceValue("BA", 1));

        if(err) {
            return Promise.reject(err);
        }

        response+='';

        while(response.length < 5) {
            response = '0' + response;
        }

        response = 'BA' + response;

        return  new ResponseModel(Status._200, "Read success", response);
    }

    async getCvNumber(): Promise<ResponseModel<string>> {
        let [err, response] = await to(this.counterRpository.getNextSequenceValue("CV", 1));

        if(err) {
            return Promise.reject(err);
        }

        response+='';

        while(response.length < 5) {
            response = '0' + response;
        }

        response = 'CV' + response;

        return  new ResponseModel(Status._200, "Read success", response);
    }

    public async insert(obj: RegistrationDto) {
        obj.deleted_flag = false;
        obj.created_date = new Date();
        return super.insert(obj);
    }


    // public async insert(obj: RegistrationDto): Promise<ResponseModel<any>> {
    //         let await to(this.registrationRepo.insert([obj]));
    //         // obj.created_date = obj.updated_date =  Date.now();
    //         // obj.deleted_flag = false;
    //         // //obj.mabv = mabv;

    //         // let [errSchedule, dataSchedule] = await to(this.scheduleRepository.findOneBy(obj.malichkb.toString()));
    //         // if(errSchedule) {
    //         //     return new ResponseModel(Status._500, JSON.stringify(errSchedule), null);
    //         // }

            
    //         // if(dataSchedule && dataSchedule.length <= 0 && dataSchedule[0].reserve == false)
    //         // {
    //         //     dataSchedule[0].reserve = true;
    //         //     console.log(dataSchedule[0]);
    //         //     let [err, result] = await to(this.scheduleRepository.update(dataSchedule[0]));
    //         //     if(err) 
    //         //     {
    //         //         return new ResponseModel(Status._500, "err");
    //         //     }
    //         //     else
    //         //     {
    //         //         const [errRegis, response] = await to(super.insert(obj));
    //         //         if(errRegis) {
    //         //             return new ResponseModel(Status._500, JSON.stringify(errRegis));
    //         //         }
    
    //         //         if(response) {
    //         //             return new ResponseModel(Status._200, response[0]);
    //         //         }
    //         //     }
    //         // }
    //         // else
    //         // {
    //         //     return new ResponseModel(Status._200, "Implement later");
    //         //     //to do find scheduler 
    //         // }
            
            
    // }

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
