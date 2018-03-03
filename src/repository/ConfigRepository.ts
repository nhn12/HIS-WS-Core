import { CounterRepository } from './CounterRepository';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { ConfigDto } from '../model/ConfigDto';
import { ConfigSchema } from '../model/ConfigSchema';


export interface ConfigRepository {
    insert(obj: any[]): Promise<ConfigDto[]>;
    delete(obj: ConfigDto): Promise<ConfigDto[]>; 
    update(obj: ConfigDto): Promise<ConfigDto[]>;  
}

@injectable()
export class ConfigRepositoryImpl implements ConfigRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        ConfigSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('config_tbl');
            doc.id = count;
            console.log('pre-save', count);
            next();
        });
        this.col = mongoose.model('config_tbl', ConfigSchema, 'config_tbl');
    }

    public async insert(obj: any[]): Promise<ConfigDto[]> {
        for(var i = 0; i < obj.length; i++)
        {
            console.log(obj[i].id);
            if(obj[i].id == null)
            {
                let count = await this.counterRepository.getNextSequenceValue('config_tbl');
                obj[i].id = count;
            }
        }     
        console.log(obj);
        let [err, data] = await to(this.col.insertMany(obj));
        
        if(err) {
            return Promise.reject(err);
        }

        let result: ConfigDto[] = [];
        return Object.assign<ConfigDto[], mongoose.Document[]>(result, data);
    }

    public async delete(obj: ConfigDto): Promise<ConfigDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: ConfigDto[] = [];
        return Object.assign<ConfigDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: ConfigDto): Promise<ConfigDto[]>
    {
        console.log(obj);
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: ConfigDto[] = [];
        return Object.assign<ConfigDto[], mongoose.Document[]>(result, data);
    }

}