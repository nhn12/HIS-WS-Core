import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { IcdCategorySchema } from "../model/IcdCategorySchema";
import * as mongoose from 'mongoose';
import { IcdCategoryDto } from "../model/IcdCategoryDto";



export interface IcdCategoryRepository {
    insert(obj: any[]): Promise<IcdCategoryDto[]>;
    delete(obj: IcdCategoryDto): Promise<IcdCategoryDto[]>; 
    update(obj: IcdCategoryDto): Promise<IcdCategoryDto[]>;  
}

@injectable()
export class IcdCategoryRepositoryImpl extends CoreRepository<IcdCategoryDto> implements IcdCategoryRepository {
    public setPrimaryTable(): string {
        return 'icd_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return IcdCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}