import { injectable } from 'inversify';
import * as mongoose from 'mongoose';


export interface CategoryRepository {
    query(resource: string, filterBuilder: any, sort: any, limit: number, offset: number): Promise<any>;
}

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {
    constructor() {
    }

    public async insert(resource: string, data: any) {
        let col = mongoose.model(resource);
        data.createdDate = data.updatedDate = new Date();
    }

    public async query(resource: string, filterBuilder: any, sort: any, limit: number, offset: number): Promise<any> {
        let col = mongoose.model(resource, null, resource);
        console.log(filterBuilder, sort, resource, limit, offset);
        let data = await col.aggregate([{
            $facet: {
                data: [{ $match: filterBuilder }, {$sort: sort}, {$skip: offset}, {$limit : limit}],
                totalRecords: [{ $match: filterBuilder }, { $count: 'madkkb' }]
            }
        }]);
    console.log(data);
        return data;
    }

}