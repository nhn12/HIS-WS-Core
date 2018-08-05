import { CounterRepository } from '../repository/CounterRepository';
import * as mongoose from 'mongoose';
import { Schema, Collection } from 'mongoose';
import to from '../util/promise-utils';
import TYPES from '../types';
import { inject, injectable } from 'inversify';
import { QueryResultDto } from '../model/QueryResultDto';
import generateCode from '../util/generate-utils';

@injectable()
export abstract class CoreRepository<D> {
    col: mongoose.Model<any>;

    @inject(TYPES.CounterRepository)
    protected counterRepository: CounterRepository;

    constructor() {
        this.initCollection();
    }

    public abstract setPrimaryTable(): string;
    public abstract setSchema(): Schema;
    public abstract definedIndexs(): string[];

    public async query(filter: any, sort: any, skip: number, limit: number, ext?: any): Promise<QueryResultDto> {
        let objFilter = [];

        console.log(filter);

        let onlyFilter = [];
        if (filter) {
            this.replaceRegrex(filter);
            objFilter.push({ $match: filter });
            onlyFilter.push({ $match: filter });
        }

        if (this.getJoinTable() && this.getJoinTable().length > 0) {
            objFilter.push(...this.getJoinTable());
        }

        if (sort) {
            objFilter.push({ $sort: sort });
        }

        if (skip != undefined && skip != null) {
            objFilter.push({ $skip: skip });
        }

        if (limit != undefined && limit != null) {
            objFilter.push({ $limit: limit });
        }

        let aggre = [{
            $facet: {
                data: objFilter,
                totalRecords: [...onlyFilter, { $count: 'madkkb' }]
            }
        }]

        return <any>this.col.aggregate(aggre);
    }

    public async findBy(obj: any, sort?: any) {
        if(!sort) {
            sort = {updated_date: -1}
        }
        let [error, response] = await to(this.col.find(obj).sort(sort));

        if(error) {
            return Promise.reject(error);
        }

        return response;
    }

    protected getJoinTable(): any[] {
        return null;
    }

    public async upsert(obj: D, condition?: any): Promise<D> {
        if (!obj) {
            return Promise.reject("Empty data");
        }

        if (obj['id'] == undefined || obj['id'] == null) {
            let [err1, response1] = await to(this.insert([obj]));
            if (err1 || !response1) {
                return Promise.reject(err1);
            }
            return response1[0];
        }

        if (!condition) {
            condition = { id: obj["id"] };
        }

        let [err, response] = await to(this.findOneBy(condition));
        if (err) {
            return Promise.reject(err);
        }

        if (!response) {
            let [err1, response1] = await to(this.insert([obj]));
            if (err1 || !response1) {
                return Promise.reject(err1);
            }
            return response1[0];
        }

        return this.update(obj);
    }

    private replaceRegrex(filter: any) {
        if(filter.length != undefined) {
            filter.forEach(element => {
                this.replaceRegrex(element);
            });
        } else {
            if(filter['$regrex'] != undefined) {
                filter['$regrex'] = new RegExp("/^bar$/i");
            }
        }
    }

    public async findOneBy(condition: any): Promise<D> {
        let [err, response] = await to(this.col.findOne(condition));

        if (err) {
            return Promise.reject(err);
        }

        if(!response) {
            return null;
        }

        return response.toObject({ getters: true });
    }

    public async findAll(): Promise<Array<D>> {
        let data = await this.col.find({ deleted_flag: false });
        let result: D[] = [];
        return Object.assign<D[], mongoose.Document[]>(result, data);
    }

    public initCollection() {
        
        this.col = mongoose.model(this.setPrimaryTable(), this.setSchema(), this.setPrimaryTable());
    }

    protected generateCode(row) {
        let NUMBER_C = 4;

        if(!row) {
            return row;
        }

        let tempId = row['id'];
        if(tempId == undefined || tempId == null) {
            return tempId;
        }

        tempId += '';
        return generateCode(tempId, 6, 'CMT');
    }


    public async insert(obj: D[]): Promise<D[]> {
        let [errC, seqC] = await to(this.counterRepository.getNextSequenceValue(this.setPrimaryTable(), obj.length));

        if (errC) {
            return Promise.reject(errC);
        }

        obj.forEach(element => {
            element['id'] = seqC++;
            element['code'] = (element['code']?element['code']:this.generateCode(element));
        })

        let [err, response] = await to(this.col.insertMany(obj));

        if (err) {
            return Promise.reject(err);
        }

        return response;
    }

    public async update(obj: D) {
        obj['updated_date'] = new Date();
        let [err, data] = await to(this.col.updateMany({ id: obj['id'] }, { $set: obj }))

        if (err) {
            return Promise.reject(err);
        }

        return data;
    }

    public async delete(obj: D) {
        let [err, data] = await to(this.col.updateMany({ id: obj['id'] }, { $set: { "deleted_flag": true } }))
        if (err) {
            return Promise.reject(err);
        }

        return data;
    }

    public getCollection(): mongoose.Model<any> {
        return this.col;
    }
}