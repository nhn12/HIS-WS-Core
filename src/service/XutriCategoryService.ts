import { XutriCategoryDto } from './../model/XutriCategoryDto';
import { XutriCategoryRepository } from './../repository/XutriCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';

export interface XutriCategoryService {
    insert(obj: XutriCategoryDto): Promise<any>;
    insertMany(obj: XutriCategoryDto[]): Promise<any>;
    delete(obj: XutriCategoryDto): Promise<ResponseModel<any>>;
    update(obj: XutriCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class XutriCategoryServiceImpl extends CoreService<XutriCategoryDto, any> implements XutriCategoryService {

    @inject(TYPES.XutriCategoryRepository)
    protected mainRepository: XutriCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
