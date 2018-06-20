import { CacBoPhanCategoryDto } from "../model/CacBoPhanCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { CacBoPhanCategorySchema } from "../model/CacBoPhanCategorySchema";
import * as mongoose from 'mongoose';



export interface CacBoPhanCategoryRepository {
    insert(obj: any[]): Promise<CacBoPhanCategoryDto[]>;
    delete(obj: CacBoPhanCategoryDto): Promise<CacBoPhanCategoryDto[]>; 
    update(obj: CacBoPhanCategoryDto): Promise<CacBoPhanCategoryDto[]>;  
}

@injectable()
export class CacBoPhanCategoryRepositoryImpl extends CoreRepository<CacBoPhanCategoryDto> implements CacBoPhanCategoryRepository {
    public setPrimaryTable(): string {
        return 'cacbophan_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return CacBoPhanCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}