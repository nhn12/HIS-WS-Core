import { DiseaseCategoryDto } from "../model/DiseaseCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { DiseaseCategorySchema } from "../model/DiseaseCategorySchema";
import * as mongoose from 'mongoose';



export interface DiseaseCategoryRepository {
    insert(obj: any[]): Promise<DiseaseCategoryDto[]>;
    delete(obj: DiseaseCategoryDto): Promise<DiseaseCategoryDto[]>; 
    update(obj: DiseaseCategoryDto): Promise<DiseaseCategoryDto[]>;  
}

@injectable()
export class DiseaseCategoryRepositoryImpl extends CoreRepository<DiseaseCategoryDto> implements DiseaseCategoryRepository {
    public setPrimaryTable(): string {
        return 'disease_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return DiseaseCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}