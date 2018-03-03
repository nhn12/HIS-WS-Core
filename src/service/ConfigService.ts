import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ConfigRepository } from '../repository/ConfigRepository';
import { ConfigDto } from '../model/ConfigDto';


export interface ConfigService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: ConfigDto): Promise<ResponseModel<any>>;
    update(obj: ConfigDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ConfigServiceImpl implements ConfigService {
    @inject(TYPES.ConfigRepository)
    private ConfigRepository: ConfigRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        console.log("Service");
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ConfigRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: ConfigDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ConfigRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: ConfigDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ConfigRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
