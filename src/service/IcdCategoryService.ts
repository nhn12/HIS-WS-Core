import { IcdCategoryDto } from './../model/IcdCategoryDto';
import { IcdCategoryRepository } from './../repository/IcdCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface IcdCategoryService {
    insert(obj: IcdCategoryDto): Promise<any>;
    insertMany(obj: IcdCategoryDto[]): Promise<any>;
    delete(obj: IcdCategoryDto): Promise<ResponseModel<any>>;
    update(obj: IcdCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class IcdCategoryServiceImpl extends CoreService<IcdCategoryDto, any> implements IcdCategoryService {

    @inject(TYPES.IcdCategoryRepository)
    protected mainRepository: IcdCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
