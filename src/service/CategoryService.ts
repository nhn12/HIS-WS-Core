import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { CategoryRepository } from '../repository/CategoryRepository';
import { RequestQueryDto } from '../model/RequestQueryDto';
import AppConstants from "../util/AppConstant"
import { ParseUtils } from '../util/parse-utils';
import to from '../util/promise-utils';
import { ResponseModel, Status } from '../model/ResponseDto';
import container from '../inversify.config';
import { CoreRepository } from '../core/CoreRepository';
import { ResponseUtil } from '../util/ResponseUtils';

export interface CategoryService {
    query(obj: RequestQueryDto);
}

@injectable()
export class CategoryServiceImpl implements CategoryService {
    @inject(TYPES.CategoryRepository)
    private registrationRepo: CategoryRepository;

    @inject(TYPES.ResponseUtil) 
    private responseUtils: ResponseUtil;

    public async query(obj: RequestQueryDto): Promise<ResponseModel<any>> {
        let tempResource = Symbol(ParseUtils.convertTableToRepositoryName(obj.resource, 2)).toString().toLocaleLowerCase();
        let existsInstanceKey;
        for(var item in TYPES) {
            if(TYPES[item].toString().toLocaleLowerCase() == tempResource) {
                existsInstanceKey = TYPES[item];
            }
        }

        if(!existsInstanceKey) {
            return new ResponseModel(Status._500, "Table not support query");
        }
        

        let instance = container.get<CoreRepository<any>>(existsInstanceKey);
        let [err, response] = await to(instance.query(obj.filter, obj.sort, obj.offset, obj.limit));
        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err));
        }

        console.log(response);

        if (response[0] && response[0].totalRecords && response[0].totalRecords.length > 0) {
            return this.responseUtils.buildListData<any>(Status._200, "success", response[0].data, response[0].totalRecords[0].madkkb);
        } else {
            return this.responseUtils.buildListData<any>(Status._200, "success", [], 0);
        } 


        // let ext = [];
        // if (!obj.resource) {
        //     return null;
        // }

        // if (!obj.filter) {
        //     obj.filter = {};
        // }

        // if (obj.limit == undefined || obj.limit == null) {
        //     obj.limit = AppConstants.DEFAULT_LIMIT_RECORD_SEARCH;
        // }

        // if (obj.offset == undefined || obj.offset == null) {
        //     obj.offset = AppConstants.DEFAULT_OFFSET_RECORD_SEARCH;
        // }

        // obj.filter.deleted_flag = false;

        // var [error, re] = await to(this.registrationRepo.query(obj.resource, obj.filter, this.getJoinTable(obj.resource, ext), ext, obj.sort, obj.limit, obj.offset));

        // if(error) {
        //     return Promise.reject(error);
        // }

        // if (re && re.length > 0) {
        //     re[0].data = this.parseObj(re[0].data, obj.resource);
        //     return re[0];
        // }
        // return re;
    }

    public definedIndexs() {
        return ["name"];
    }

    private getJoinTable(resource: string, ext: any[]) {
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
            case 'doctor_tbl':
                return [
                    this.generateSubQueries('type_tbl', 'gender', 'code', 'gender_name', ext,  [{$eq:['$class', 'GENDER']}], 'name'),
                    this.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name') ]
            case "registration_tbl":
                return [
                    // this.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name'),
                    this.generateSubQueries('type_tbl', 'gioitinh', 'code', 'gender_name', ext,  [{$eq:['$class', 'GENDER']}], 'name'),
                ]
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
            case 'doctor_tbl':
                // data = ParseUtils.mappingField(data, 'gender_type', 'name', 'gender_name', false);
                // return data = ParseUtils.mappingField(data, 'specialization_tbl', 'name', 'specialization_name', false);
        }
        return data;

    }

    private generateSubQueries(tableJoin: string, parentFieldName: string, subField: string, outputField, ext: any[],  extCondition?: Object[], nameViewInSub?: string) {
        let result: any = {};
        result.from = tableJoin;
        result['let'] = {};
        result['let'][parentFieldName] = '$' + parentFieldName;
        

        //
        result['pipeline'] = [];
        
        // extra subcondition
        let subQueries = {$match: {$expr: {$and: []}}};
        subQueries.$match.$expr.$and.push({$eq: ['$'+subField, '$$'+parentFieldName]});

        if(extCondition) {
            extCondition.forEach(element=>{
                subQueries.$match.$expr.$and.push(element);
            })
        }
        result['pipeline'].push(subQueries);
        result['as'] = outputField;

        let replaceEle = {};
        replaceEle[outputField] = { $mergeObjects: [ { $arrayElemAt: [ "$"+outputField, 0 ] }] } ;
       ext.push({$addFields : replaceEle});

        let reaplce2 = {};
        reaplce2[outputField] = '$' + outputField + '.' + nameViewInSub
        ext.push({$addFields : reaplce2});

        return result;

    }




}
