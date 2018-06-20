import { TrieuchungCategoryDto } from './../model/TrieuchungCategoryDto';
import { TrieuchungCategoryRepository } from './../repository/TrieuchungCategoryRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from '../core/CoreService';

export interface TrieuchungCategoryService {
    insert(obj: TrieuchungCategoryDto): Promise<any>;
    insertMany(obj: TrieuchungCategoryDto[]): Promise<any>;
    delete(obj: TrieuchungCategoryDto): Promise<ResponseModel<any>>;
    update(obj: TrieuchungCategoryDto): Promise<ResponseModel<any>>;
}

@injectable()
export class TrieuchungCategoryServiceImpl extends CoreService<TrieuchungCategoryDto, any> implements TrieuchungCategoryService {

    @inject(TYPES.TrieuchungCategoryRepository)
    protected mainRepository: TrieuchungCategoryRepository;

    public setMainRepository() {
        return this.mainRepository;
    }
}
