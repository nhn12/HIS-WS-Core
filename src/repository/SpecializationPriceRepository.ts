import { CounterRepository } from './CounterRepository';
import { SpecializationPriceSchema } from './../model/SpecializationPriceSchema';
import { SpecializationPriceDto } from './../model/SpecializationPriceDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { CoreRepository } from '../core/CoreRepository';


export interface SpecializationPriceRepository {
    insert(obj: any[]): Promise<SpecializationPriceDto[]>;
    delete(obj: SpecializationPriceDto): Promise<SpecializationPriceDto[]>; 
    update(obj: SpecializationPriceDto): Promise<SpecializationPriceDto[]>;  
    findOneBy(id: string): Promise<SpecializationPriceDto>;
}

@injectable()
export class SpecializationPriceRepositoryImpl extends CoreRepository<SpecializationPriceDto> implements SpecializationPriceRepository {
    public setPrimaryTable(): string {
        return "specialization_price_tbl"
    }
    
    public setSchema(): mongoose.Schema {
        return SpecializationPriceSchema;
    }

    public definedIndexs() {
        return null;
    }
    
    // @inject(TYPES.CounterRepository)
    // private counterRepository: CounterRepository;

    // col: mongoose.Model<any>;
    // constructor() {
    //     let self = this;
    //     SpecializationPriceSchema.pre('save', async function (next, doc) {
    //         var doc = this;
    //         var count = await self.counterRepository.getNextSequenceValue('specialization_price_tbl');
    //         doc.id = count;
    //         next();
    //     });
    //     this.col = mongoose.model('specialization_price_tbl', SpecializationPriceSchema, 'specialization_price_tbl');
    // }

    // public async insert(obj: any[]): Promise<SpecializationPriceDto[]> {
    //     for(var i = 0; i < obj.length; i++)
    //     {
    //         let count = await this.counterRepository.getNextSequenceValue('specialization_price_tbl');
    //         obj[i].id = count;
    //     }     
    //     let [err, data] = await to(this.col.insertMany(obj));
        
    //     if(err) {
    //         return Promise.reject(err);
    //     }

    //     let result: SpecializationPriceDto[] = [];
    //     return Object.assign<SpecializationPriceDto[], mongoose.Document[]>(result, data);
    // }

    // public async delete(obj: SpecializationPriceDto): Promise<SpecializationPriceDto[]> {
    //     let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
    //     if(err) {
    //         return Promise.reject(err);
    //     }

    //     let result: SpecializationPriceDto[] = [];
    //     return Object.assign<SpecializationPriceDto[], mongoose.Document[]>(result, data);
    // }

    // public async update(obj: SpecializationPriceDto): Promise<SpecializationPriceDto[]>
    // {
    //     obj.updated_date = Date.now();
    //     let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
    //     if(err) {
    //         return Promise.reject(err);
    //     }

    //     let result: SpecializationPriceDto[] = [];
    //     return Object.assign<SpecializationPriceDto[], mongoose.Document[]>(result, data);
    // }

    // public async findOneBy(id: string): Promise<SpecializationPriceDto> {
    //     return new Promise<SpecializationPriceDto>((resolve, reject)=>{
    //         this.col.findOne({
    //             id: id
    //         }, function(err, result) {
    //             if(err) {
    //                 reject(err);
    //             }
    //             else if(!result) {
    //                 resolve(undefined);
    //                 return;
    //             }
    //             else{
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }



}