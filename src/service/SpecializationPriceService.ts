import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationPriceRepository } from '../repository/SpecializationPriceRepository';
import { SpecializationPriceDto } from '../model/SpecializationPriceDto';


export interface SpecializationPriceService {
    insert(obj: any): Promise<ResponseModel<any>>;
    findOneBy(id: string): Promise<ResponseModel<any>>;
    delete(obj: SpecializationPriceDto): Promise<ResponseModel<any>>;
    update(obj: SpecializationPriceDto): Promise<ResponseModel<any>>;
}

@injectable()
export class SpecializationPriceServiceImpl implements SpecializationPriceService {
    @inject(TYPES.SpecializationPriceRepository)
    private SpecializationPriceRepository: SpecializationPriceRepository;


    public async insert(obj: any): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.SpecializationPriceRepository.insert(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async findOneBy(id: string): Promise<ResponseModel<any>>{
        let [err, result] = to(await this.SpecializationPriceRepository.findOneBy(id));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async delete(obj: SpecializationPriceDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.SpecializationPriceRepository.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: SpecializationPriceDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.SpecializationPriceRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
