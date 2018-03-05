import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { CommuneDto } from '../model/CommuneDto';
import { CommuneSchema } from '../model/CommuneSchema';

export interface CommuneRepository {
    insert(obj: any[]): Promise<CommuneDto[]>;
    delete(obj: CommuneDto): Promise<CommuneDto[]>; 
    update(obj: CommuneDto): Promise<CommuneDto[]>;  
}

@injectable()
export class CommuneRepositoryImpl implements CommuneRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        CommuneSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('commune_tbl');
            doc.id = count;
            console.log('pre-save', count);
            next();
        });
        this.col = mongoose.model('commune_tbl', CommuneSchema, 'commune_tbl');
    }

    public async insert(obj: any[]): Promise<CommuneDto[]> {
        // for(var i = 0; i < obj.length; i++)
        // {
        //     if(obj[i].id == null)
        //     {
        //         let count = await this.counterRepository.getNextSequenceValue('commune_tbl');
        //         obj[i].id = count;
        //     }

        // }     
        console.log(obj);
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: CommuneDto[] = [];
        return Object.assign<CommuneDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: CommuneDto): Promise<CommuneDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: CommuneDto[] = [];
        return Object.assign<CommuneDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: CommuneDto): Promise<CommuneDto[]>
    {
        obj.updated_date = Date.now();
        console.log(obj);
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: CommuneDto[] = [];
        return Object.assign<CommuneDto[], mongoose.Document[]>(result, data);
    }

}