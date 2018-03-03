import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { DistrictDto } from '../model/DistrictDto';
import { DistrictRepository } from '../repository/DistrictRepository';

export interface DistrictService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: DistrictDto): Promise<ResponseModel<any>>;
    update(obj: DistrictDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DistrictServiceImpl implements DistrictService {
    @inject(TYPES.DistrictRepository)
    private DistrictRepository: DistrictRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        console.log("Service");
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.DistrictRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: DistrictDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.DistrictRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: DistrictDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.DistrictRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
