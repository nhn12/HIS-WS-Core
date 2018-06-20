import { ReasonCategoryDto } from "../model/ReasonCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { ReasonCategorySchema } from "../model/ReasonCategorySchema";
import * as mongoose from 'mongoose';



export interface ReasonCategoryRepository {
    insert(obj: any[]): Promise<ReasonCategoryDto[]>;
    delete(obj: ReasonCategoryDto): Promise<ReasonCategoryDto[]>; 
    update(obj: ReasonCategoryDto): Promise<ReasonCategoryDto[]>;  
}

@injectable()
export class ReasonCategoryRepositoryImpl extends CoreRepository<ReasonCategoryDto> implements ReasonCategoryRepository {
    public setPrimaryTable(): string {
        return 'reason_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return ReasonCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}