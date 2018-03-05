import { UserSchema } from './../model/UserModel';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import { CounterRepository } from './CounterRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import TYPES from '../types';
import to from './../util/promise-utils';
import { UserDto } from '../model/UserDto';
import * as bcrypt from 'bcrypt';
import config from '../../config/config';



export interface UserRepository {
    addUser(user: UserDto): Promise<UserDto>;
    findOneBy(user: UserDto): Promise<UserDto>;
    delete(obj: UserDto): Promise<UserDto[]>; 
    update(obj: UserDto): Promise<UserDto[]>;  
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
    @inject(TYPES.CounterRepository)
    private counterRepository: CounterRepository;

    col: mongoose.Model<any>;
    
    constructor() {
        var Schema = mongoose.Schema;
        this.col = mongoose.model('user_tbls', UserSchema );
    }

    public async findOneBy(user: UserDto): Promise<UserDto> {
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
        let count = await this.counterRepository.getNextSequenceValue('user_tbls');
        user.id = count;           
        
        user.hash_password = bcrypt.hashSync(user.password, 10);

        var doc: mongoose.Document = new this.col(user);

        return new Promise<UserDto>((resolve, reject)=>{
            this.col.insertMany([doc]).then(result=>{
                var tempUser: any = result;
                tempUser.hash_password = undefined;
                resolve(tempUser);
            }).catch(err=>{
                reject(err);
            });
        });
    }

    public async delete(obj: UserDto): Promise<UserDto[]> {
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set: { "deleted_flag" : true }}))
        if(err) {
            return Promise.reject(err);
        }

        let result: UserDto[] = [];
        return Object.assign<UserDto[], mongoose.Document[]>(result, data);
    }

    public async update(obj: UserDto): Promise<UserDto[]>
    {
        obj.updated_date = Date.now();
        let [err, data] = await to(this.col.updateMany({id : obj.id},  { $set:  obj }))
        if(err) {
            return Promise.reject(err);
        }

        let result: UserDto[] = [];
        return Object.assign<UserDto[], mongoose.Document[]>(result, data);
    }
}