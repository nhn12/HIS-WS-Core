import { CacBoPhanCategoryDto } from './../model/CacBoPhanCategoryDto';
import { CacBoPhanCategoryRepository } from './../repository/CacBoPhanCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';

export interface CacBoPhanCategoryService {
    insert(obj: CacBoPhanCategoryDto): Promise<any>;
    insertMany(obj: CacBoPhanCategoryDto[]): Promise<any>;
    delete(obj: CacBoPhanCategoryDto): Promise<ResponseModel<any>>;
    update(obj: CacBoPhanCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class CacBoPhanCategoryServiceImpl extends CoreService<CacBoPhanCategoryDto, any> implements CacBoPhanCategoryService {

    @inject(TYPES.CacBoPhanCategoryRepository)
    protected mainRepository: CacBoPhanCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
