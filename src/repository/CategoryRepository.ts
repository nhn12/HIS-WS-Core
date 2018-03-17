import { injectable } from 'inversify';
import * as mongoose from 'mongoose';
import to from '../util/promise-utils';


export interface CategoryRepository {
    query(resource: string, filterBuilder: any, joinTable: any[], ext: any[], sort: any, limit: number, offset: number): Promise<any>;
}

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor() {
        
    }

    public async insert(resource: string, data: any) {
        let col = mongoose.model(resource);
        data.createdDate = data.updatedDate = new Date();
    }

    public async query(resource: string, filterBuilder: any, joinTable: any[], ext: any,  sort: any, limit: number, offset: number): Promise<any> {
        let col = mongoose.model(resource, null, resource);

        let objFilter = [];
        
        if(filterBuilder) {
            objFilter.push({ $match: filterBuilder });
        }

        if(joinTable && joinTable.length > 0) {
            objFilter.push(...joinTable.map(value=>{
                return {$lookup: value}
            }));
        }

        console.log(ext);
        objFilter.push(...ext);

        if(sort) {
            objFilter.push({$sort: sort});
        }

        if(offset != undefined && offset != null) {
            objFilter.push({$skip : offset});
        }

        if(limit != undefined && limit != null) {
            objFilter.push({$limit : limit});
        }

        // [{ $match: filterBuilder }, {$sort: sort}, {$skip: offset}, {$limit : limit}, {$lookup: {from: "specialization_tbl",
        //         localField: "specialization_id",
        //         foreignField: "id",
        //         as: "inventory_docss"}},{$lookup: {from: "specialization_tbl",
        //         localField: "specialization_id",
        //         foreignField: "id",
        //         as: "inventory_docs"}}]

        return col.aggregate([{
            $facet: {
                data: objFilter,
                totalRecords: [{ $match: filterBuilder }, { $count: 'madkkb' }]
            }
        }]);
        //return data;
    }

}