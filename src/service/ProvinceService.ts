import { ProvinceDto } from './../model/ProvinceDto';
import { ProvinceRepository } from './../repository/ProvinceRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface ProvinceService {
    insert(obj: ProvinceDto): Promise<any>;
    insertMany(obj: ProvinceDto[]): Promise<any>;
    delete(obj: ProvinceDto): Promise<ResponseModel<any>>;
    update(obj: ProvinceDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ProvinceServiceImpl extends CoreService<ProvinceDto, any> implements ProvinceService {

    @inject(TYPES.ProvinceRepository)
    protected mainRepository: ProvinceRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
