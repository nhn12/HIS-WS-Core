import { TongquatCategoryDto } from './../model/TongquatCategoryDto';
import { TongquatCategoryRepository } from './../repository/TongquatCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface TongquatCategoryService {
    insert(obj: TongquatCategoryDto): Promise<any>;
    insertMany(obj: TongquatCategoryDto[]): Promise<any>;
    delete(obj: TongquatCategoryDto): Promise<ResponseModel<any>>;
    update(obj: TongquatCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class TongquatCategoryServiceImpl extends CoreService<TongquatCategoryDto, any> implements TongquatCategoryService {

    @inject(TYPES.TongquatCategoryRepository)
    protected mainRepository: TongquatCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
