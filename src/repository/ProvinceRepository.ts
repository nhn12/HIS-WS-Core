import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { ProvinceDto } from '../model/ProvinceDto';
import { ProvinceSchema } from '../model/ProvinceSchema';

export interface ProvinceRepository {
    insert(obj: any[]): Promise<ProvinceDto[]>;
    delete(obj: ProvinceDto): Promise<ProvinceDto[]>; 
    update(obj: ProvinceDto): Promise<ProvinceDto[]>;  
}

@injectable()
export class ProvinceRepositoryImpl implements ProvinceRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        ProvinceSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('province_tbl');
            doc.id = count;
            next();
        });
        this.col = mongoose.model('province_tbl', ProvinceSchema, 'province_tbl');
    }

    public async insert(obj: any[]): Promise<ProvinceDto[]> {
        for(var i = 0; i < obj.length; i++)
        {
            let count = await this.counterRepository.getNextSequenceValue('province_tbl');
            obj[i].id = count;           
        }
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: ProvinceDto[] = [];
        return Object.assign<ProvinceDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: ProvinceDto): Promise<ProvinceDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: ProvinceDto[] = [];
        return Object.assign<ProvinceDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: ProvinceDto): Promise<ProvinceDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: ProvinceDto[] = [];
        return Object.assign<ProvinceDto[], mongoose.Document[]>(result, data);
    }

}