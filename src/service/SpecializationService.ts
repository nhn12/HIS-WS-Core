import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationRepository } from '../repository/SpecializationRepository';
import { SpecializationPriceRepository } from '../repository/SpecializationPriceRepository';
import { CounterRepository } from '../repository/CounterRepository';
import { SpecializationDto } from '../model/SpecializationDto';


export interface SpecializationService {
    insert(obj: SpecializationDto): Promise<any>;
    delete(obj: SpecializationDto): Promise<ResponseModel<any>>;
    update(obj: SpecializationDto): Promise<ResponseModel<any>>;
}

@injectable()   
export class SpecializationServiceImpl implements SpecializationService {
    @inject(TYPES.SpecializationRepository) 
    private scheduleRepository: SpecializationRepository;
    @inject(TYPES.SpecializationPriceRepository)
    private specializationPriceRepository: SpecializationPriceRepository;
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;


    public async insert(obj: SpecializationDto): Promise<any> {
        let prices = obj.prices;
        obj.prices = undefined;
        let [err, response] = await to(this.scheduleRepository.insert([obj]));
        if(err || !response || response.length <= 0) {
            return new ResponseModel(Status._500, JSON.stringify(err));
        }

        if(prices != null && prices.length > 0)
        {
            prices.forEach(element => {
                element.specialization_id = response[0].id;
            });
            let [err, responseP] = await to(this.specializationPriceRepository.insert(prices));  
            if(err) {
                return new ResponseModel(Status._500, JSON.stringify(err));;
            }                         
        }

        return new ResponseModel(Status._200, "Success", response);
    }

    public async delete(obj: SpecializationDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: SpecializationDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        if(obj.prices != null && obj.prices.length > 0)
        {
            obj.prices.forEach(element => {
                this.specializationPriceRepository.update(element);
            });
        }
        
        let [err, result] = await to(this.scheduleRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }
}
