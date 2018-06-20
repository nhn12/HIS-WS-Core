import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';
import { DiseaseCategoryDto } from '../model/DiseaseCategoryDto';
import { DiseaseCategoryRepository } from '../repository/DiseaseCategoryRepository';

export interface DiseaseCategoryService {
    insert(obj: DiseaseCategoryDto): Promise<any>;
    insertMany(obj: DiseaseCategoryDto[]): Promise<any>;
    delete(obj: DiseaseCategoryDto): Promise<ResponseModel<any>>;
    update(obj: DiseaseCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DiseaseCategoryServiceImpl extends CoreService<DiseaseCategoryDto, any> implements DiseaseCategoryService {

    @inject(TYPES.DiseaseCategoryRepository)
    protected mainRepository: DiseaseCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
