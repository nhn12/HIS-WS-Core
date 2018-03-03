import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ProvinceDto } from '../model/ProvinceDto';
import { ProvinceRepository } from '../repository/ProvinceRepository';

export interface ProvinceService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: ProvinceDto): Promise<ResponseModel<any>>;
    update(obj: ProvinceDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ProvinceServiceImpl implements ProvinceService {
    @inject(TYPES.ProvinceRepository)
    private ProvinceRepository: ProvinceRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        console.log("Service");
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ProvinceRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: ProvinceDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ProvinceRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: ProvinceDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.ProvinceRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
