import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { DistrictDto } from '../model/DistrictDto';
import { DistrictRepository } from '../repository/DistrictRepository';
import { ProvinceRepository } from '../repository/ProvinceRepository';

export interface DistrictService {
    insert(obj: DistrictDto): Promise<any>;
    delete(obj: DistrictDto): Promise<ResponseModel<any>>;
    update(obj: DistrictDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DistrictServiceImpl implements DistrictService {
    @inject(TYPES.DistrictRepository)
    private DistrictRepository: DistrictRepository;
    @inject(TYPES.ProvinceRepository)
    private ProvinceRepository: ProvinceRepository;


    public async insert(obj: DistrictDto): Promise<any> {
        console.log(obj.id);
        if(obj.id != null && obj.province_id != null)
        {
            obj.province_id.forEach(element => {
                element.district_id = obj.id;
            });
        }
        await this.ProvinceRepository.insert(obj.province_id);                           
        //await this.specializationPriceRepository.insert(obj[0].price);
        console.log("after");
        return await this.DistrictRepository.insert([obj]);
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
