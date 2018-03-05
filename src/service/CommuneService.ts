import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CommuneDto } from '../model/CommuneDto';
import { CommuneRepository } from '../repository/CommuneRepository';
import { DistrictRepository } from '../repository/DistrictRepository';
import { ProvinceRepository } from '../repository/ProvinceRepository';
import { CounterRepository } from '../repository/CounterRepository';

export interface CommuneService {
    insert(obj: CommuneDto): Promise<any>;
    delete(obj: CommuneDto): Promise<ResponseModel<any>>;
    update(obj: CommuneDto): Promise<ResponseModel<any>>;
}

@injectable()
export class CommuneServiceImpl implements CommuneService {
    @inject(TYPES.CommuneRepository)
    private CommuneRepository: CommuneRepository;
    @inject(TYPES.DistrictRepository)
    private DistrictRepository: DistrictRepository;
    @inject(TYPES.ProvinceRepository)
    private ProvinceRepository: ProvinceRepository;
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;


    public async insert(obj: CommuneDto): Promise<any> {
        let countCommune = await this.counterRepository.getNextSequenceValue('commune_tbl');
        let countDistrict = await this.counterRepository.getNextSequenceValue('district_tbl');
        obj.id = countCommune;
        console.log(obj);
        if(obj.district_id != null)
        {
            // obj.district_id.forEach(element => {
            //     element.commune_id = countCommune;
            // });
            var i;
            for(i = 0; i< obj.district_id.length; i++)
            {
                obj.district_id[i].commune_id = countCommune;
                obj.district_id[i].id = countDistrict + i;
                if(obj.district_id[i].province_id != null)
                {
                    var j;
                    for(j = 0; j< obj.district_id[i].province_id.length; j++)
                    {
                        obj.district_id[i].province_id[j].district_id = countDistrict + i;
                    }
                    await this.ProvinceRepository.insert(obj.district_id[i].province_id);
                }
            }
        }
        console.log(obj.district_id);
        await this.DistrictRepository.insert(obj.district_id);                           
        //await this.specializationPriceRepository.insert(obj[0].price);
        console.log("after");
        return await this.CommuneRepository.insert([obj]);
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
        if(obj.district_id != null)
        {
            obj.district_id.forEach(element => {
                this.DistrictRepository.update(element);
                if(element.province_id != null)
                {
                    element.province_id.forEach(element => {
                        this.ProvinceRepository.update(element);
                    });
                }
            });
        }

        let [err, result] = await to(this.CommuneRepository.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

  




 
}
