import { TiencanCategoryDto } from './../model/TiencanCategoryDto';
import { TiencanCategoryRepository } from './../repository/TiencanCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface TiencanCategoryService {
    insert(obj: TiencanCategoryDto): Promise<any>;
    insertMany(obj: TiencanCategoryDto[]): Promise<any>;
    delete(obj: TiencanCategoryDto): Promise<ResponseModel<any>>;
    update(obj: TiencanCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class TiencanCategoryServiceImpl extends CoreService<TiencanCategoryDto, any> implements TiencanCategoryService {

    @inject(TYPES.TiencanCategoryRepository)
    protected mainRepository: TiencanCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
