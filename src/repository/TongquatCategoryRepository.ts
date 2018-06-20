import { TongquatCategoryDto } from "../model/TongquatCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { TongquatCategorySchema } from "../model/TongquatCategorySchema";
import * as mongoose from 'mongoose';



export interface TongquatCategoryRepository {
    insert(obj: any[]): Promise<TongquatCategoryDto[]>;
    delete(obj: TongquatCategoryDto): Promise<TongquatCategoryDto[]>; 
    update(obj: TongquatCategoryDto): Promise<TongquatCategoryDto[]>;  
}

@injectable()
export class TongquatCategoryRepositoryImpl extends CoreRepository<TongquatCategoryDto> implements TongquatCategoryRepository {
    public setPrimaryTable(): string {
        return 'tongquat_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return TongquatCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}