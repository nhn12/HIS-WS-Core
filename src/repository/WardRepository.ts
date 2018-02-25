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
    insert(obj: any[]): Promise<WardDto[]>;
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
            console.log('pre-save', count);
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
        var count = await this.counterRepository.getNextSequenceValue('ward_tbl');
        obj.id = count;
        let [err, data] = await to(this.col.insertMany([obj]));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: WardDto[] = [];
        return Object.assign<WardDto[], mongoose.Document[]>(result, data);
    }
}