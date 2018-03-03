import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CommuneDto } from '../model/CommuneDto';
import { CommuneRepository } from '../repository/CommuneRepository';

export interface CommuneService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: CommuneDto): Promise<ResponseModel<any>>;
    update(obj: CommuneDto): Promise<ResponseModel<any>>;
}

@injectable()
export class CommuneServiceImpl implements CommuneService {
    @inject(TYPES.CommuneRepository)
    private CommuneRepository: CommuneRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        console.log("Service");
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.CommuneRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: CommuneDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.CommuneRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: CommuneDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.CommuneRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
