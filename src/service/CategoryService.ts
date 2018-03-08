import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { CategoryRepository } from '../repository/CategoryRepository';
import { RequestQueryDto } from '../model/RequestQueryDto';
import AppConstants from "../util/AppConstant"
import { ParseUtils } from '../util/parse-utils';

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

        obj.filter.deleted_flag = false;

        var re = await this.registrationRepo.query(obj.resource, obj.filter, this.getJoinTable(obj.resource), obj.sort,  obj.limit, obj.offset).then(result=>{
            if(result && result.length > 0)
             {
                //  if(result.)
                result[0].data = this.parseObj(result[0].data, obj.resource);
                return result[0];
             }
             return result;
        });
        return re;
    }

    private getJoinTable(resource: string) {
        switch (resource) {
            case 'ward_tbl':
                return [{
                    from: 'specialization_tbl',
                    localField: "specialization_id",
                    foreignField: "id",
                    as: "specialization_tbl"
                }];
            case 'blueprint_schedule_tbl':
                return [{
                    from: 'specialization_tbl',
                    localField: "specialization_id",
                    foreignField: "id",
                    as: "specialization_tbl"
                },
                {
                    from: 'ward_tbl',
                    localField: "ward_id",
                    foreignField: "id",
                    as: "ward_tbl"
                }];
            case 'specialization_tbl':
                return [{
                    from: 'specialization_price_tbl',
                    localField: "id",
                    foreignField: "specialization_id",
                    as: "prices"
                }];
            case 'schedule_tbl':
                return [{
                    from: 'specialization_tbl',
                    localField: "specialization_id",
                    foreignField: "id",
                    as: "specialization_tbl"
                },
                {
                    from: 'ward_tbl',
                    localField: "ward_id",
                    foreignField: "id",
                    as: "ward_tbl"
                }];
            
        }
        return null;
    }

    private parseObj(data: any[], resource: string) {
        switch (resource) {
            case 'ward_tbl':
                return ParseUtils.mappingField(data, 'specialization_tbl', 'name', 'specialization_name', false);
            case 'blueprint_schedule_tbl':
                data = ParseUtils.mappingField(data, 'specialization_tbl', 'name', 'specialization_name', false);
                return ParseUtils.mappingField(data, 'ward_tbl', 'name', 'ward_name', false);
            case 'schedule_tbl':
                data = ParseUtils.mappingField(data, 'specialization_tbl', 'name', 'specialization_name', false);
                data = ParseUtils.mappingDateToHoursString(data, 'start_time', 'start_time_string');
                data = ParseUtils.mappingDateToHoursString(data, 'end_time', 'end_time_string');
                return ParseUtils.mappingField(data, 'ward_tbl', 'name', 'ward_name', false);
        }
        return data;

    }



 
}
