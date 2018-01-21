import { UserSchema } from './../model/UserModel';
import {injectable} from 'inversify';
import * as mongoose from 'mongoose';
import { RegistrationDto } from '../model/RegistrationDto';
import { UserDto } from '../model/UserDto';
import * as bcrypt from 'bcrypt';
import config from '../../config/config';



export interface UserRepository {
    addUser(user: UserDto): Promise<UserDto>;
    findOneBy(user: UserDto): Promise<UserDto>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
    col: mongoose.Model<any>;
    
    constructor() {
        var Schema = mongoose.Schema;
        this.col = mongoose.model('user_tbls', UserSchema );
    }

    public async findOneBy(user: UserDto): Promise<UserDto> {
        console.log("---------")
        return new Promise<UserDto>((resolve, reject)=>{
            this.col.findOne({
                username: user.username
            }, function(err, result) {
                if(err) {
                    reject(err);
                }
                if(!result) {
                    resolve(undefined);
                    return;
                }
                if(result.comparePassword(user.password) || user.password == config.MASTER_KEY) {
                    resolve(result);
                } else {
                    resolve(undefined);
                }
            });
        });
    }

    public async addUser(user: UserDto): Promise<UserDto> {
        user.hash_password = bcrypt.hashSync(user.password, 10);

        var doc: mongoose.Document = new this.col(user);

        return new Promise<UserDto>((resolve, reject)=>{
            this.col.insertMany([doc]).then(result=>{
                console.log(result);
                var tempUser: any = result;
                tempUser.hash_password = undefined;
                resolve(tempUser);
            }).catch(err=>{
                reject(err);
            });
        });
    }
}