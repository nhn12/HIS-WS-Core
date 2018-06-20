import { XutriCategoryDto } from "../model/XutriCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { XutriCategorySchema } from "../model/XutriCategorySchema";
import * as mongoose from 'mongoose';



export interface XutriCategoryRepository {
    insert(obj: any[]): Promise<XutriCategoryDto[]>;
    delete(obj: XutriCategoryDto): Promise<XutriCategoryDto[]>; 
    update(obj: XutriCategoryDto): Promise<XutriCategoryDto[]>;  
}

@injectable()
export class XutriCategoryRepositoryImpl extends CoreRepository<XutriCategoryDto> implements XutriCategoryRepository {
    public setPrimaryTable(): string {
        return 'xutri_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return XutriCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}