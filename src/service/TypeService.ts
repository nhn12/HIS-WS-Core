import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { TypeDto } from '../model/TypeDto';
import { TypeRepository } from '../repository/TypeRepository';


export interface TypeService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: TypeDto): Promise<ResponseModel<any>>;
    update(obj: TypeDto): Promise<ResponseModel<any>>;
}

@injectable()
export class TypeServiceImpl implements TypeService {
    @inject(TYPES.TypeRepository)
    private TypeRepository: TypeRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        console.log("Service");
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.TypeRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: TypeDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.TypeRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: TypeDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        console.log(obj);
        let [err, result] = await to(this.TypeRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
