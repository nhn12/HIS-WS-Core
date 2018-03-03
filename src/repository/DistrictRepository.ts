import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { DistrictDto } from '../model/DistrictDto';
import { DistrictSchema } from '../model/DistrictSchema';

export interface DistrictRepository {
    insert(obj: any[]): Promise<DistrictDto[]>;
    delete(obj: DistrictDto): Promise<DistrictDto[]>; 
    update(obj: DistrictDto): Promise<DistrictDto[]>;  
}

@injectable()
export class DistrictRepositoryImpl implements DistrictRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        DistrictSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('district_tbl');
            doc.id = count;
            console.log('pre-save', count);
            next();
        });
        this.col = mongoose.model('district_tbl', DistrictSchema, 'district_tbl');
    }

    public async insert(obj: any[]): Promise<DistrictDto[]> {
        for(var i = 0; i < obj.length; i++)
        {
            let count = await this.counterRepository.getNextSequenceValue('district_tbl');
            obj[i].id = count;
        }     
        console.log(obj);
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: DistrictDto[] = [];
        return Object.assign<DistrictDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: DistrictDto): Promise<DistrictDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: DistrictDto[] = [];
        return Object.assign<DistrictDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: DistrictDto): Promise<DistrictDto[]>
    {
        console.log(obj);
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: DistrictDto[] = [];
        return Object.assign<DistrictDto[], mongoose.Document[]>(result, data);
    }

}