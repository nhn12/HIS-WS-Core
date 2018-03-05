import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { RegistrationRepository } from '../repository/RegistrationRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { UserRepository } from '../repository/UserRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { UserDto } from '../model/UserDto';
import * as jsonwebtoken from 'jsonwebtoken';
import config from '../../config/config';


export interface UserService {
    register(user: UserDto): Promise<UserDto>;
    login(user: UserDto): Promise<UserDto>;
    checkRequiredLogin(obj: any): Promise<UserDto>;
    delete(obj: UserDto): Promise<ResponseModel<any>>;
    update(obj: UserDto): Promise<ResponseModel<any>>;
}

@injectable()
export class UserServiceImpl implements UserService {
    @inject(TYPES.UserRepository)
    private userRepo: UserRepository;

    public async register(user): Promise<UserDto> {
        return await this.userRepo.addUser(user);
    }

    public async login(user: UserDto): Promise<UserDto> {

        return await this.userRepo.findOneBy(user).catch(err=>{return err});
    }

    public async checkRequiredLogin(obj: any):Promise<UserDto> {
        if(!obj || !obj.authorization) {
            return new Promise<UserDto>((resolve, reject)=>{
                resolve(undefined);
            });
        }

        return new Promise<UserDto>((resolve, reject)=>{
            jsonwebtoken.verify(obj.authorization, config.KEY_ENCRYPTION, function(err, user) {
                if(err) {
                    resolve(undefined);
                }
                resolve(user);
            })
        });
    }

    public async delete(obj: UserDto): Promise<ResponseModel<any>>{
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.userRepo.delete(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: UserDto): Promise<ResponseModel<any>> {
        if(!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.userRepo.update(obj));
        if(err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }


 
}
