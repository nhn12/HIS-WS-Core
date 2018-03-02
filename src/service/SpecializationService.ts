import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationRepository } from '../repository/SpecializationRepository';
import { SpecializationPriceRepository } from '../repository/SpecializationPriceRepository';
import { SpecializationDto } from '../model/SpecializationDto';


export interface SpecializationService {
    insert(obj: SpecializationDto): Promise<any>;
    update(obj: any): Promise<ResponseModel<any>>;
}

@injectable()   
export class SpecializationServiceImpl implements SpecializationService {
    @inject(TYPES.SpecializationRepository) 
    private scheduleRepository: SpecializationRepository;
    @inject(TYPES.SpecializationPriceRepository)
    private specializationPriceRepository: SpecializationPriceRepository;


    public async insert(obj: SpecializationDto): Promise<any> {
        console.log(obj.id);
        if(obj.id != null && obj.price != null)
        {
            obj.price.forEach(element => {
                element.specialization_id = obj.id;
            });
        }
        await this.specializationPriceRepository.insert(obj.price);                           
        //await this.specializationPriceRepository.insert(obj[0].price);
        console.log("after");
        return await this.scheduleRepository.insert([obj]);
    }

    public async update(obj: any): Promise<ResponseModel<any>> {
        throw new Error("Method not implemented.");
    }

  




 
}
