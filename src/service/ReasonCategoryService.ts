import { ReasonCategoryDto } from './../model/ReasonCategoryDto';
import { ReasonCategoryRepository } from './../repository/ReasonCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface ReasonCategoryService {
    insert(obj: ReasonCategoryDto): Promise<any>;
    insertMany(obj: ReasonCategoryDto[]): Promise<any>;
    delete(obj: ReasonCategoryDto): Promise<ResponseModel<any>>;
    update(obj: ReasonCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ReasonCategoryServiceImpl extends CoreService<ReasonCategoryDto, any> implements ReasonCategoryService {

    @inject(TYPES.ReasonCategoryRepository)
    protected mainRepository: ReasonCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
