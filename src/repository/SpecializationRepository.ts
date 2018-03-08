import { CounterRepository } from './CounterRepository';
import { SpecializationSchema } from './../model/SpecializationSchema';
import { SpecializationDto } from './../model/SpecializationDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { SyncService } from '../service/SyncService';


export interface SpecializationRepository {
    findAll(): Promise<SpecializationDto[]>;
    insert(obj: any[]): Promise<SpecializationDto[]>;
    delete(obj: SpecializationDto): Promise<SpecializationDto[]>; 
    update(obj: SpecializationDto): Promise<SpecializationDto[]>; 
    convertToSyncDTO(object: SpecializationDto); 
    insertSyncDTO(obj: Object, url: string, optional?: any); 
}

@injectable()
export class SpecializationRepositoryImpl implements SpecializationRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    private syncService: SyncService;

    col: mongoose.Model<any>;
    constructor( @inject(TYPES.SyncService) _syncService: SyncService) {
        this.syncService = _syncService;
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
        // generate
        let count = await this.counterRepository.getNextSequenceValue("specialization_tbl", obj.length);

        obj.forEach(element=>{
            element.id = count++;
        })

        let [err, data] = await to(this.col.insertMany(obj));
        
        var SyncDTO = this.convertToSyncDTO(obj[0]);
        this.insertSyncDTO(SyncDTO, "HISHealthCare/Create", null);
        
        if(err) {
            return Promise.reject(err);
        }

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

    public convertToSyncDTO(object: SpecializationDto)
    {        
        var SyncDTO = {
                    HisId: object.id.toString(),
                    Name: object.name,
                    Code: object.id.toString(),
                    //Type: object.prices[0].type
                      };
        return SyncDTO;
    }

    public insertSyncDTO(obj: Object, url: string, optional?: any)
    {
        this.syncService.sync(obj, url, null);
    }
}