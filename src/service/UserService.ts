import { HospitalRepository } from '../repository/HospitalRepository';
import { UserType } from '../model/UserType';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { RegistrationRepository } from '../repository/RegistrationRepository';
import { RegistrationDto } from '../model/RegistrationDto';
import { UserRepository } from '../repository/UserRepository';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { UserDto } from '../model/UserDto';
import * as jsonwebtoken from 'jsonwebtoken';
import config from '../../config/config';
import { StaffAccountRepository } from '../repository/StaffAccountRepository';
import { StaffRepository } from '../repository/StaffRepository';
import { RoleRepository } from '../repository/RoleRepository';
import { StaffAccountDto } from '../model/StaffAccountDto';


export interface UserService {
    register(user: UserDto): Promise<UserDto>;
    login(user: UserDto): Promise<any>;
    checkRequiredLogin(obj: any): Promise<UserDto>;
    delete(obj: UserDto): Promise<ResponseModel<any>>;
    update(obj: UserDto): Promise<ResponseModel<any>>;
}

@injectable()
export class UserServiceImpl implements UserService {
    @inject(TYPES.UserRepository)
    private userRepo: UserRepository;

    @inject(TYPES.StaffAccountRepository)
    private saffAccRepo: StaffAccountRepository;

    @inject(TYPES.StaffRepository)
    private staffRepo: StaffRepository;

    @inject(TYPES.RoleRepository)
    private roleRepo: RoleRepository;

    @inject(TYPES.HospitalRepository)
    private hospitalRepo: HospitalRepository;

    public async register(user): Promise<UserDto> {
        return await this.userRepo.addUser(user);
    }

    public async login(user: UserDto): Promise<any> {

        if (!user) {
            return Promise.reject("Un-authentication");
        }

        let userModel: any = null;
        if (user.userType == UserType.CUSTOMER) {
            let [error, data] = await to(this.userRepo.findOneBy(user));
            if (error) {
                return Promise.reject(error);
            }
            userModel = data;
        } else if (user.userType == UserType.STAFF) {
            let [error, data] = await to(this.saffAccRepo.findOneBy({ username: user.username, password: user.password }));
            if (error) {
                return Promise.reject(error);
            }

            userModel = data;

            if(userModel.status == 0) {
                return Promise.reject('ERR_008');
            }

            let [erro1r, data1] = await to(this.staffRepo.findOneBy({ id:  data.staff_id}));
            if(erro1r) {
                return Promise.reject(erro1r);
            }

            if(!data1) {
                return Promise.reject('ERR_001');
            }


            let dataRole = await this.roleRepo.getRoleByAccountId(userModel.id);

            userModel.operation = data1.operation;
            userModel.hospital_id = data1.hospital_id;
            userModel.operation = dataRole.operation;

            let account = await this.saffAccRepo.getAccountByHospitaId(userModel.hospital_id);
            account.last_visit = new Date();
            
            let hospital = await this.hospitalRepo.findOneBy({id: userModel.hospital_id});
            hospital.last_visit = new Date();
            await this.hospitalRepo.update(hospital);
            await this.saffAccRepo.update(account);
        }

        if(!userModel) {
            return Promise.reject('ERR_002');
        }

        if (userModel) {
            userModel.created = new Date();
            userModel.password = undefined;
            userModel.userType = user.userType;
        }

        return { username: userModel.username, user: userModel, token: jsonwebtoken.sign({username: userModel.username, password: userModel.userType, created: userModel.created}, config.KEY_ENCRYPTION) }
    }

    public async checkRequiredLogin(obj: any): Promise<UserDto> {
        if (!obj || !obj.authorization) {
            return new Promise<UserDto>((resolve, reject) => {
                resolve(undefined);
            });
        }

        return new Promise<UserDto>((resolve, reject) => {
            jsonwebtoken.verify(obj.authorization, config.KEY_ENCRYPTION, function (err, user) {
                if (err) {
                    resolve(undefined);
                }
                resolve(user);
            })
        });
    }

    public async delete(obj: UserDto): Promise<ResponseModel<any>> {
        if (!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.userRepo.delete(obj));
        if (err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }

    public async update(obj: UserDto): Promise<ResponseModel<any>> {
        if (!obj) {
            return new ResponseModel(Status._400, "lack of data");
        }
        let [err, result] = await to(this.userRepo.update(obj));
        if (err) {
            return new ResponseModel(Status._500, "err");
        }

        return new ResponseModel(Status._200, "success", result);
    }
}
