import {injectable, inject} from 'inversify';
import * as mongoose from 'mongoose';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { RegistrationDto } from '../model/RegistrationDto';
import { SchedulerSchema } from '../model/ScheduleSchema';
import { ScheduleDto } from '../model/ScheduleDto';
import { Schema } from 'mongoose';
import { CounterRepository } from './CounterRepository';
import TYPES from '../types';


export interface ScheduleRepository {
    findAll(): Promise<Array<ScheduleDto>>;
    insert(obj: any[]): Promise<ScheduleDto[]>;
}

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    col:mongoose.Model<any>;

    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;
    constructor() {

        this.col = mongoose.model('schedule_tbl', SchedulerSchema, 'schedule_tbl' );
    }

    public async findAll(): Promise<Array<ScheduleDto>> {
        let data = await this.col.find();
        let result: ScheduleDto[] = [];
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any[]): Promise<ScheduleDto[]> {
        let result: ScheduleDto[] = [];
        
        let seq = await this.counterRepository.getNextSequenceValue("schedule_tbl", obj.length);

        obj.map(element=>{
            element.id = seq++;
        })

        console.log(obj);
        let data = await this.col.insertMany(obj);


        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }
}