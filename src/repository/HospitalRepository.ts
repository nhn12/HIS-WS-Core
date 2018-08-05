import { HospitalDto } from '../model/HospitalDto';
import { HospitalSchema } from '../model/HospitalSchema';
import { injectable} from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import { CoreRepository } from '../core/CoreRepository';
import { MongoUtils } from '../util/mongo-utils';


export interface HospitalRepository {
    insert(obj: HospitalDto[]): Promise<HospitalDto[]>;
    delete(obj: HospitalDto): Promise<HospitalDto[]>; 
    update(obj: HospitalDto): Promise<HospitalDto[]>;  
}

@injectable()
export class HospitalRepositoryImpl extends CoreRepository<HospitalDto> implements HospitalRepository {
    public setPrimaryTable(): string {
        return 'hospital_tbl'
    }
    public setSchema(): mongoose.Schema {
        return HospitalSchema;
    }

    public getJoinTable() {
        return [
            MongoUtils.generateJoinTable("specialization_tbl", "hospital_id", "id", "specialization"),
            MongoUtils.generateJoinTable("ward_tbl", "hospital_id", "id", "ward"),

        ]
    }

    public definedIndexs() {
        return ["name"];
    }
}