import { SpecializationRepository } from '../repository/SpecializationRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationPriceRepository } from '../repository/SpecializationPriceRepository';
import { CounterRepository } from '../repository/CounterRepository';
import { SpecializationDto } from '../model/SpecializationDto';
import { SpecializationPriceDto } from '../model/SpecializationPriceDto';
import { SyncService } from './SyncService';
import { ParseUtils } from '../util/parse-utils';
import { CoreService } from '../core/CoreService';


export interface SpecializationService {
    insert(obj: SpecializationDto): Promise<any>;
    delete(obj: SpecializationDto): Promise<ResponseModel<any>>;
    update(obj: SpecializationDto): Promise<ResponseModel<any>>;
    //convertToSyncSpecializationDTO(object: SpecializationDto); 
}

@injectable()   
export class SpecializationServiceImpl extends CoreService<any, any> implements SpecializationService {
    public registerServiceName(): string {
        return "specialization"
    }
    // @inject(TYPES.SpecializationRepository) 
    // private scheduleRepository: SpecializationRepository;
    // @inject(TYPES.SpecializationPriceRepository)
    // private specializationPriceRepository: SpecializationPriceRepository;
    // @inject(TYPES.CounterRepository)
    // private counterRepository: CounterRepository;
    // private syncService: SyncService;

    // constructor( @inject(TYPES.SyncService) _syncService: SyncService) {
    //     this.syncService = _syncService;
    // }

    // public async insert(obj: SpecializationDto): Promise<any> {

    //     let prices = obj.prices;

    //     obj.prices = undefined;

    //     let [err, response] = await to(this.scheduleRepository.insert([obj]));
        
    //     //response array
    //     if(err || !response) {
    //         return new ResponseModel(Status._500, JSON.stringify(err), null);
    //     }

    //     return new ResponseModel(Status._200, "Success", response);
    // }

    // public async delete(obj: SpecializationDto): Promise<ResponseModel<any>>{
    //     if(!obj) {
    //         return new ResponseModel(Status._400, "lack of data");
    //     }
    //     if(obj.prices != null)
    //     {
    //         obj.prices.forEach(element => {
    //             this.specializationPriceRepository.delete(element);
    //         });
    //     }
    //     let [err, result] = await to(this.scheduleRepository.delete(obj));
    //     if(err) {
    //         return new ResponseModel(Status._500, "err");
    //     }

    //     return new ResponseModel(Status._200, "success", result);
    // }

    // public async update(obj: SpecializationDto): Promise<ResponseModel<any>> {
    //     if(!obj) {
    //         return new ResponseModel(Status._400, "lack of data");
    //     }
    //     if(obj.prices != null)
    //     {
    //         obj.prices.forEach(element => {
    //             this.specializationPriceRepository.update(element);
    //         });
    //     }
    //     let [err, result] = await to(this.scheduleRepository.update(obj));
    //     if(err) {
    //         return new ResponseModel(Status._500, "err");
    //     }

    //     return new ResponseModel(Status._200, "success", result);
    // }

    // public convertToSyncSpecializationDTO(object: any)
    // {        
    //     var prices = new Array();
    //     object.prices.forEach(element => {
    //         var price = {
    //                     "Price": element.price.toString(),
    //                     "Type": element.type.toString(),
    //                     "EffectiveDate": ParseUtils.convertToFormatDateSync(element.to_date)
    //                     };
    //         prices.push(price);
    //     });

    //     var SyncDTO = {
    //                 "HisId": object[0].id.toString(),
    //                 "Name": object[0].name,
    //                 "Code": object[0].id.toString(),
    //                 "Prices": prices
    //                   };
    //     return SyncDTO;
    // }



    // public async Sync(obj: any)
    // {
    //     let check = false;
    //     obj.prices.forEach(element => {
    //         if(new Date(element.to_date) > new Date())
    //         {
    //             check = true;
    //         }
    //         else
    //         {
    //             check = false;
    //         }
    //     });

    //     if(check = true)
    //     {
    //         var SyncSpecializationPriceDTO = this.convertToSyncSpecializationDTO(obj);   
    //         console.log(SyncSpecializationPriceDTO);       
    //         return this.syncService.sync(SyncSpecializationPriceDTO, "HISHealthCare/Create", null);
    //     }
    //     else
    //     {
    //         return Promise.reject("Date Effect can not before current date");
    //     }


       
    //}
}
