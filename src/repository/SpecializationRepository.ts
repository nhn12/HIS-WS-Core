import { CounterRepository } from './CounterRepository';
import { SpecializationSchema } from './../model/SpecializationSchema';
import { SpecializationDto } from './../model/SpecializationDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';

export interface SpecializationRepository {
    findAll(): Promise<SpecializationDto[]>;
    insert(obj: any[]): Promise<SpecializationDto[]>;
    delete(obj: SpecializationDto): Promise<SpecializationDto[]>; 
    update(obj: SpecializationDto): Promise<SpecializationDto[]>; 
}

@injectable()
export class SpecializationRepositoryImpl implements SpecializationRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    constructor() {
        let self = this;
        SpecializationSchema.pre('save', async function (next, doc) {
            var doc = this;
            var count = await self.counterRepository.getNextSequenceValue('specialization_tbl');
            doc.id = count;
            next();
        });
        this.col = mongoose.model('specialization_tbl', SpecializationSchema, 'specialization_tbl');
    }

    public async findAll(): Promise<Array<SpecializationDto>> {
        let data = await this.col.find();
        let result: SpecializationDto[] = [];
        return Object.assign<SpecializationDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any[]): Promise<SpecializationDto[]> {

        for(var i = 0; i < obj.length; i++)
        {
            let count = await this.counterRepository.getNextSequenceValue('specialization_tbl');
            obj[i].id = count;           
        } 

        let [errCount, seq] = await to(this.counterRepository.getNextSequenceValue("specialization_tbl", count));

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

    public async delete(obj: SpecializationDto): Promise<SpecializationDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: SpecializationDto[] = [];
        return Object.assign<SpecializationDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: SpecializationDto): Promise<SpecializationDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: SpecializationDto[] = [];
        return Object.assign<SpecializationDto[], mongoose.Document[]>(result, data);
    }

}