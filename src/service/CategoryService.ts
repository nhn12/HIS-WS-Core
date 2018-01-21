import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { CategoryRepository } from '../repository/CategoryRepository';
import { RequestQueryDto } from '../model/RequestQueryDto';
import AppConstants from "../util/AppConstant"

export interface CategoryService {
    query(obj: RequestQueryDto);
}

@injectable()
export class CategoryServiceImpl implements CategoryService {
    @inject(TYPES.CategoryRepository)
    private registrationRepo: CategoryRepository;

    public async query(obj: RequestQueryDto): Promise<Array<any>> {
        if(!obj.resource) {
            return null;
        }

        if(!obj.filter) {
            obj.filter = {};
        }

        if(!obj.sort) {
            obj.sort = {};
        }

        if(obj.limit == undefined || obj.limit == null) {
            obj.limit = AppConstants.DEFAULT_LIMIT_RECORD_SEARCH;
        }

        if(obj.offset == undefined || obj.offset == null) {
            obj.offset = AppConstants.DEFAULT_OFFSET_RECORD_SEARCH;
        }

        var re = await this.registrationRepo.query(obj.resource, obj.filter, obj.sort,  obj.limit, obj.offset).then(result=>{
            if(result && result.length > 0)
             {
                return result[0];
             }
             return result;
        });
        return re;
    }

 
}
