import { ParseUtils } from './../util/parse-utils';
import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import { UserService } from '../service/UserService';
import { RegistrableController } from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { ResponseModel, Status } from '../model/ResponseDto';
import { UserDto } from '../model/UserDto';
import * as jsonwebtoken from 'jsonwebtoken';
import config from '../../config/config';
import { SyncService } from '../service/SyncService';
import to from '../util/promise-utils';


@injectable()
export class UserController implements RegistrableController {
    private userService: UserService;
    private responseUtils: ResponseUtil;
    private syncService: SyncService;


    constructor(@inject(TYPES.UserService) _userService: UserService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil,
                @inject(TYPES.SyncService) _syncServce: SyncService) {
        this.userService = _userService;
        this.responseUtils = _responseUtils;
        this.syncService = _syncServce;
    }

    public register(app: express.Application): void {
        app.route('/api/login')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                 this.userService.login(req.body).then(result=>{
                    if(!result) {
                        res.json(this.responseUtils.buildAuthenticationFailed());
                    }
                    res.json(new ResponseModel(Status._200, "Login sucess", {token: jsonwebtoken.sign({username: result.username, fullname: result.fullname, created: result.created}, config.KEY_ENCRYPTION)}));
                 }).catch(err => {
                    res.json(this.responseUtils.buildAuthenticationFailed());
                 });
            });

            app.route('/api/test')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            //   console.log(ParseUtils.convertToDateSync(new Date().toISOString()));
            });
        
        app.route('/api/register')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.userService.register(req.body).catch(err => next(err));
                res.json(new ResponseModel<any>(Status._200, "success", addresses));
            });

        app.route('/api/user/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.userService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/user/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.userService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route("/api/loginRequired")
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                // const addresses = await this.registartionService.getAllRegistration().catch(err => next(err));
                res.json({});
            });
    }
}
