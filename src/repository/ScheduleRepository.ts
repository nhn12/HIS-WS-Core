import {injectable} from 'inversify';
import * as mongoose from 'mongoose';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { RegistrationDto } from '../model/RegistrationDto';
import { SchedulerSchema } from '../model/ScheduleSchema';
import { ScheduleDto } from '../model/ScheduleDto';
import { Schema } from 'mongoose';


export interface ScheduleRepository {
    findAll(): Promise<Array<ScheduleDto>>;
    insert(obj: any[]): Promise<ScheduleDto[]>;
}

@injectable()
export class ScheduleRepositoryImpl implements ScheduleRepository {
    col:mongoose.Model<any>;

    
    constructor() {

        this.col = mongoose.model('schedule_tbl', SchedulerSchema );
    }

    public async findAll(): Promise<Array<ScheduleDto>> {
        let data = await this.col.find();
        let result: ScheduleDto[] = [];
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }

    public async insert(obj: any[]): Promise<ScheduleDto[]> {
        let data = await this.col.insertMany(obj);
        let result: ScheduleDto[] = [];
        console.log(data);
        return Object.assign<ScheduleDto[], mongoose.Document[]>(result, data);
    }
}