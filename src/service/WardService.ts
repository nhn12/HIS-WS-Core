import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { WardRepository } from '../repository/WardRepository';
import { WardDto } from '../model/WardDto';
import { SyncService } from '../service/SyncService';
import { CounterRepository } from '../repository/CounterRepository';


export interface WardService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: WardDto): Promise<ResponseModel<any>>;
    delete(obj: WardDto): Promise<ResponseModel<any>>;
    convertToSyncDTO(object: WardDto);
}

@injectable()
export class WardServiceImpl implements WardService {
    @inject(TYPES.WardRepository)
    private scheduleRepository: WardRepository;
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    private syncService: SyncService;

    constructor(@inject(TYPES.SyncService) _syncService: SyncService) {
        this.syncService = _syncService;
    }

    public async insert(obj: any): Promise<any> {
        let [err, response] = await to(this.scheduleRepository.insert(obj));

        //response array
        if(err || !response) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        console.log(response);

        this.Sync(response);
        return new ResponseModel(Status._200, "Success", response);
    }

    public async update(obj: WardDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: WardDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.scheduleRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public convertToSyncDTO(object: WardDto)
    {        
        var SyncDTO = {
                    HisId: object.id.toString(),
                    Name: object.name
                      };
        return SyncDTO;
    }

    public Sync(obj: any)
    {
        console.log("sync");

        obj.forEach(element => {
            let wardSync = this.convertToSyncDTO(element);
            this.syncService.sync(wardSync, "HISRoom/Create", null);
        });
     
    }
 
}
