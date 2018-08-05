import { MongoUtils } from '../util/mongo-utils';
import { RoleDto } from '../model/RoleDto';
import { OperationSchema } from '../model/OperationSchema';
import { injectable } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import { CoreRepository } from '../core/CoreRepository';
import { RoleSchema } from '../model/RoleSchema.1';
import to from '../util/promise-utils';


export interface RoleRepository {
    insert(obj: RoleDto[]): Promise<RoleDto[]>;
    delete(obj: RoleDto): Promise<RoleDto[]>; 
    update(obj: RoleDto): Promise<RoleDto[]>; 
    getRoleByAccountId(accountId): Promise<RoleDto>; 
}

@injectable()
export class RoleRepositoryImpl extends CoreRepository<RoleDto> implements RoleRepository {
    public setPrimaryTable(): string {
        return 'role_tbl'
    }
    public setSchema(): mongoose.Schema {
        return RoleSchema;
    }

    public definedIndexs() {
        return ["name"];
    }

    public getJoinTable() {
        return [
            MongoUtils.generateJoinTable("operation_tbl", "operation", "code", "operationObj", true),
            // Group back to arrays
        ]
    }

    public async getRoleByAccountId(accountId: number): Promise<RoleDto> {
        let [error, response] = await to<RoleDto[]>(this.getCollection().aggregate([
            MongoUtils.generateJoinTable("staff_tbl", "id", "role", "staff"),
            { $unwind: "$staff" },
            MongoUtils.generateJoinTable("staff_account_tbl", "staff.id", "staff_id", "staffAccount")
       ]));
       if(error) {
           return Promise.reject(error);
       }


       if(response.length <= 0) {
           return null;
       }

       return response[0];
    }
}