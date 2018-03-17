import { DistrictDto } from './../model/DistrictDto';
import { DistrictRepository } from './../repository/DistrictRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface DistrictService {
    insert(obj: DistrictDto): Promise<any>;
    delete(obj: DistrictDto): Promise<ResponseModel<any>>;
    update(obj: DistrictDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DistrictServiceImpl extends CoreService<DistrictDto, any> implements DistrictService {

    @inject(TYPES.DistrictRepository)
    protected mainRepository: DistrictRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
