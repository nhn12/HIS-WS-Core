import { injectable } from 'inversify';
import * as mongoose from 'mongoose';


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

        return col.aggregate([{
            $facet: {
                data: objFilter,
                totalRecords: [{ $match: filterBuilder }, { $count: 'madkkb' }]
            }
        }]);
    }

}