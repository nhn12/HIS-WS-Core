import { TrieuchungCategoryDto } from "../model/TrieuchungCategoryDto";
import { CoreRepository } from "../core/CoreRepository";
import { injectable } from "inversify";
import { Mongoose } from "mongoose";
import { TrieuchungCategorySchema } from "../model/TrieuchungCategorySchema";
import * as mongoose from 'mongoose';



export interface TrieuchungCategoryRepository {
    insert(obj: any[]): Promise<TrieuchungCategoryDto[]>;
    delete(obj: TrieuchungCategoryDto): Promise<TrieuchungCategoryDto[]>; 
    update(obj: TrieuchungCategoryDto): Promise<TrieuchungCategoryDto[]>;  
}

@injectable()
export class TrieuchungCategoryRepositoryImpl extends CoreRepository<TrieuchungCategoryDto> implements TrieuchungCategoryRepository {
    public setPrimaryTable(): string {
        return 'trieuchung_category_tbl'
    }
    public setSchema(): mongoose.Schema {
        return TrieuchungCategorySchema;
    }

    public definedIndexs() {
        return ["name"];
    }
}