import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { RegistrationRepository } from '../repository/RegistrationRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { UserRepository } from '../repository/UserRepository';
import { UserDto } from '../model/UserDto';
import * as jsonwebtoken from 'jsonwebtoken';
import config from '../../config/config';


export interface UserService {
    register(user: UserDto): Promise<UserDto>;
    login(user: UserDto): Promise<UserDto>;
    checkRequiredLogin(obj: any): Promise<UserDto>;
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


 
}
