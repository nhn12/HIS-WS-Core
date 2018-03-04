import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { WardRepository } from '../repository/WardRepository';
import { WardDto } from '../model/WardDto';


export interface WardService {
    insert(obj: any): Promise<ResponseModel<any>>;
    update(obj: WardDto): Promise<ResponseModel<any>>;
    delete(obj: WardDto): Promise<ResponseModel<any>>;
}

@injectable()
export class WardServiceImpl implements WardService {
    @inject(TYPES.WardRepository)
    private scheduleRepository: WardRepository;


    public async insert(obj: any): Promise<any> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.scheduleRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: WardDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
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
        console.log(obj);
        let [err, result] = await to(this.scheduleRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
