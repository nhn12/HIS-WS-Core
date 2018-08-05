import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { WardRepository } from '../repository/WardRepository';
import { WardDto } from '../model/WardDto';
import { SyncService } from './SyncService';
import { CounterRepository } from '../repository/CounterRepository';
import { CoreService } from '../core/CoreService';


export interface WardService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: WardDto): Promise<ResponseModel<any>>;
    delete(obj: WardDto): Promise<ResponseModel<any>>;
    //convertToSyncDTO(object: WardDto);
}

@injectable()
export class WardServiceImpl extends CoreService<any, any> implements WardService {
    public registerServiceName(): string {
        return "ward";
    }
    // @inject(TYPES.WardRepository)
    // private scheduleRepository: WardRepository;
    // @inject(TYPES.CounterRepository)
    // private counterRepository: CounterRepository;
    // private syncService: SyncService;

    // constructor(@inject(TYPES.SyncService) _syncService: SyncService) {
    //     this.syncService = _syncService;
    // }

    // public async insert(obj: any): Promise<any> {
    //     if(obj.name != null && obj.specialization_id != null)
    //     {
    //         let [err, response] = await to(this.scheduleRepository.insert([obj]));

    //         //response array
    //         if(err || !response) {
    //             return new ResponseModel(Status._500, JSON.stringify(err), null);
    //         }
    
    //         console.log(response);
    
    //         this.Sync(response);
    //         return response
    //     }
    //     else
    //     {
    //         return Promise.reject("lack of data");
    //     }

    // }

    // public async update(obj: WardDto): Promise<ResponseModel<any>> {
    //     if(!obj) {
    //         return new ResponseModel(Status._400, "lack of data");
    //     }
    //     let [err, result] = await to(this.scheduleRepository.update(obj));
    //     if(err) {
    //         return new ResponseModel(Status._500, "err");
    //     }

    //     return new ResponseModel(Status._200, "success", result);
    // }

    // public async delete(obj: WardDto): Promise<ResponseModel<any>> {
    //     if(!obj) {
    //         return new ResponseModel(Status._400, "lack of data");
    //     }
    //     let [err, result] = await to(this.scheduleRepository.delete(obj));
    //     if(err) {
    //         return new ResponseModel(Status._500, "err");
    //     }

    //     return new ResponseModel(Status._200, "success", result);
    // }

    // public convertToSyncDTO(object: WardDto)
    // {        
    //     var SyncDTO = {
    //                 HisId: object.id.toString(),
    //                 Name: object.name.toString()
    //                   };
    //     return SyncDTO;
    // }

    // public convertToSyncSpeciDTO(object: WardDto)
    // {        
    //     var SyncDTO = {
    //                 HisRoomId: object.id.toString(),
    //                 HisHealthCareId: object.specialization_id.toString()
    //                   };
    //     return SyncDTO;
    // }

    // public Sync(obj: any)
    // {
    //     console.log("sync");

    //     obj.forEach(element => {
    //         let wardSync = this.convertToSyncDTO(element);
    //         let wardSpeciSync = this.convertToSyncSpeciDTO(element);
    //         console.log(wardSync);
    //         console.log(wardSpeciSync);
    //         //open comment when use it
    //         //this.syncService.sync(wardSync, "HISRoom/Create", null);
    //         //this.syncService.sync(wardSpeciSync, "HISRoom/HealthCareMapping", null);
    //     });
     
    // }
 
}
