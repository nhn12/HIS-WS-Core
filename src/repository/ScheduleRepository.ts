import { MongoUtils } from './../util/mongo-utils';
import { injectable } from 'inversify';
import { SchedulerSchema } from '../model/ScheduleSchema';
import { ScheduleDto } from '../model/ScheduleDto';
import { Schema } from 'mongoose';
import { CoreRepository } from '../core/CoreRepository';
import 'reflect-metadata';
import { QueryResultDto } from '../model/QueryResultDto';


export interface ScheduleRepository {
    findAll(): Promise<Array<ScheduleDto>>;
    insert(obj: any[]): Promise<ScheduleDto[]>;
    delete(obj: ScheduleDto): Promise<ScheduleDto[]>; 
    update(obj: ScheduleDto): Promise<ScheduleDto[]>;
    findOneBy(id: String): Promise<any>;
    findBy(obj): Promise<any>;
    query(filter: any, sort: any, skip: number, limit: number, ext?: any): Promise<QueryResultDto>;
    //findBySpecialization(specialization_id: number, hospital_id: number);
}

@injectable()
export class ScheduleRepositoryImpl extends CoreRepository<ScheduleDto> implements ScheduleRepository {
    public setPrimaryTable(): string {
        return "schedule_tbl";
    }

    public setSchema(): Schema {
        return SchedulerSchema;
    }

    public definedIndexs() {
        return null;
    }

    protected getJoinTable(): any[] {
        let ext = [];
        return [
            { $lookup: MongoUtils.generateSubQueries('ward_tbl', 'ward_id', 'id', 'ward_name', ext, null, 'name') },
            { $lookup: MongoUtils.generateSubQueries('specialization_tbl', 'specialization_id', 'id', 'specialization_name', ext, null, 'name') },
            ...ext];
    }

    
}