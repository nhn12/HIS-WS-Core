import { CounterRepository } from './CounterRepository';
import { WardSchema } from './../model/WardSchema';
import { WardDto } from './../model/WardDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';

export interface WardRepository {
    findAll(): Promise<WardDto[]>;
    insert(obj: any): Promise<WardDto[]>;
    delete(obj: WardDto): Promise<WardDto[]>; 
    update(obj: WardDto): Promise<WardDto[]>;  

}

@injectable()
export class WardRepositoryImpl implements WardRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {       
        let self = this;
        WardSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('ward_tbl');
            doc.id = count;
            next();
        });
        this.col = mongoose.model('ward_tbl', WardSchema, 'ward_tbl');
    }

    public async findAll(): Promise<Array<WardDto>> {
        let data = await this.col.find();
        let result: WardDto[] = [];
        return Object.assign<WardDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any): Promise<WardDto[]> {
        let count = obj.length;

        let [errCount, seq] = await to(this.counterRepository.getNextSequenceValue("ward_tbl", count));

        if(errCount) {
            return Promise.reject(errCount);
        }

        console.log(seq);
        obj.forEach(element=>{
            element.id = seq++;
        })

        let [err, data] = await to(this.col.insertMany(obj));       
        
        if(err) {
            return Promise.reject(err);
        }

        console.log(obj);

        return data;
    }

    public async delete(obj: WardDto): Promise<WardDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: WardDto[] = [];
        return Object.assign<WardDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: WardDto): Promise<WardDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: WardDto[] = [];
        return Object.assign<WardDto[], mongoose.Document[]>(result, data);
    }
}