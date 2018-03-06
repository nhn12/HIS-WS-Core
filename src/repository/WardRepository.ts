import { CounterRepository } from './CounterRepository';
import { WardSchema } from './../model/WardSchema';
import { WardDto } from './../model/WardDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import TYPES from '../types';
import to from './../util/promise-utils';
import { SyncService } from '../service/SyncService';

export interface WardRepository {
    findAll(): Promise<WardDto[]>;
    insert(obj: any[]): Promise<WardDto[]>;
    delete(obj: WardDto): Promise<WardDto[]>; 
    update(obj: WardDto): Promise<WardDto[]>;  
    convertToSyncDTO(object: WardDto);
    insertSyncDTO(obj: Object, url: string, optional?: any);
}

@injectable()
export class WardRepositoryImpl implements WardRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    private syncService: SyncService;

    col: mongoose.Model<any>;
    constructor(@inject(TYPES.SyncService) _syncService: SyncService) {
        this.syncService = _syncService;
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
        var count = await this.counterRepository.getNextSequenceValue('ward_tbl');
        obj.id = count;
        let [err, data] = await to(this.col.insertMany([obj]));
        var SyncDTO = this.convertToSyncDTO(obj);
        console.log(SyncDTO);
        this.insertSyncDTO(SyncDTO, "HISRoom/Create", null);
        
        if(err) {
            return Promise.reject(err);
        }

        let result: WardDto[] = [];
        return Object.assign<WardDto[], mongoose.Document[]>(result, data);
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

    public convertToSyncDTO(object: WardDto)
    {        
        var SyncDTO = {
                    HisId: object.id.toString(),
                    Name: object.name
                      };
        return SyncDTO;
    }

    public insertSyncDTO(obj: Object, url: string, optional?: any)
    {
        this.syncService.sync(obj, url, null);
    }
}