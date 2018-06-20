import { TiencanCategoryDto } from "../model/TiencanCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { TiencanCategorySchema } from "../model/TiencanCategorySchema";
import * as mongoose from 'mongoose';



export interface TiencanCategoryRepository {
    insert(obj: any[]): Promise<TiencanCategoryDto[]>;
    delete(obj: TiencanCategoryDto): Promise<TiencanCategoryDto[]>; 
    update(obj: TiencanCategoryDto): Promise<TiencanCategoryDto[]>;  
}

@injectable()
export class TiencanCategoryRepositoryImpl extends CoreRepository<TiencanCategoryDto> implements TiencanCategoryRepository {
    public setPrimaryTable(): string {
        return 'tiencan_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return TiencanCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}