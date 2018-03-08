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
import { SpecializationPriceDto } from './../model/SpecializationPriceDto';
import { SyncService } from '../service/SyncService';


export interface SpecializationService {
    insert(obj: SpecializationDto): Promise<any>;
    delete(obj: SpecializationDto): Promise<ResponseModel<any>>;
    update(obj: SpecializationDto): Promise<ResponseModel<any>>;
    convertToSyncSpecializationPriceDTO(object: SpecializationPriceDto);
    convertToSyncSpecializationDTO(object: SpecializationDto); 
}

@injectable()   
export class SpecializationServiceImpl implements SpecializationService {
    @inject(TYPES.SpecializationRepository) 
    private scheduleRepository: SpecializationRepository;
    @inject(TYPES.SpecializationPriceRepository)
    private specializationPriceRepository: SpecializationPriceRepository;
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    private syncService: SyncService;

    constructor( @inject(TYPES.SyncService) _syncService: SyncService) {
        this.syncService = _syncService;
    }

    public async insert(obj: SpecializationDto): Promise<any> {

        let prices = obj.prices;

        obj.prices = undefined;

        let [err, response] = await to(this.scheduleRepository.insert([obj]));
        
        //response array
        if(err || !response) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        if(prices && prices.length > 0) {
            let idSpecialization = response[0].id;
            prices.forEach(element=>{
                element.specialization_id = idSpecialization;
            })

            let [errPrice, responsePrice] = await to(this.specializationPriceRepository.insert(prices));
            if(errPrice) {
                return new ResponseModel(Status._500, JSON.stringify(errPrice), null);
            }

            response.prices = responsePrice;
            console.log(response);
            //only sync when have price
            this.Sync(response);
        }

        // sync
        //syncS()

        return new ResponseModel(Status._200, "Success", response);

        // obj.prices.forEach(element => {
        //     var tmpSyncDTO = this.convertToSyncSpecializationPriceDTO(element);
        //     this.insertSync(tmpSyncDTO, "HISRoom/HealthCareMapping", null);
        // });
         //await this.scheduleRepository.insert([obj]);

        //  var SyncDTO = this.convertToSyncSpecializationDTO(obj);
        //  return this.insertSync(SyncDTO, "HISHealthCare/Create", null);

    }

    public async delete(obj: SpecializationDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        if(obj.prices != null)
        {
            obj.prices.forEach(element => {
                this.specializationPriceRepository.delete(element);
            });
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
        if(obj.prices != null)
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

    public convertToSyncSpecializationPriceDTO(object: any)
    {        
        var SyncDTO = {
                    HisRoomId: object[0].id.toString(),
                    HisHealthCareId: object.prices[0].specialization_id.toString(),
                      };
        return SyncDTO;
    }

    public convertToSyncSpecializationDTO(object: any)
    {        
        var SyncDTO = {
                    HisId: object[0].id.toString(),
                    Name: object[0].name,
                    Code: object[0].id.toString(),
                    Type: object.prices[0].type
                      };
        return SyncDTO;
    }

    public Sync(obj: any)
    {
        console.log(obj[0].id);
        console.log(obj[0].name);
        console.log(obj.prices[0].type);
        var SyncSpecializationDTO = this.convertToSyncSpecializationDTO(obj);
        this.syncService.sync(SyncSpecializationDTO, "HISHealthCare/Create", null);

            var SyncSpecializationPriceDTO = this.convertToSyncSpecializationPriceDTO(obj);
            console.log(SyncSpecializationPriceDTO);
            this.syncService.sync(SyncSpecializationPriceDTO, "HISPriceHistory/Create", null);
        
    }
}
