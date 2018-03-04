import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { TypeDto } from '../model/TypeDto';
import { TypeSchema } from '../model/TypeSchema';


export interface TypeRepository {
    insert(obj: any[]): Promise<TypeDto[]>;
    delete(obj: TypeDto): Promise<TypeDto[]>; 
    update(obj: TypeDto): Promise<TypeDto[]>;  
}

@injectable()
export class TypeRepositoryImpl implements TypeRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        TypeSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('type_tbl');
            doc.id = count;
            console.log('pre-save', count);
            next();
        });
        this.col = mongoose.model('type_tbl', TypeSchema, 'type_tbl');
    }

    public async insert(obj: any[]): Promise<TypeDto[]> {
        for(var i = 0; i < obj.length; i++)
        {
            let count = await this.counterRepository.getNextSequenceValue('type_tbl');
            obj[i].id = count;           
        }     
        console.log(obj);
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: TypeDto[] = [];
        return Object.assign<TypeDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: TypeDto): Promise<TypeDto[]> {
        console.log(obj.id);
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: TypeDto[] = [];
        return Object.assign<TypeDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: TypeDto): Promise<TypeDto[]>
    {       
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: TypeDto[] = [];
        return Object.assign<TypeDto[], mongoose.Document[]>(result, data);
    }

}