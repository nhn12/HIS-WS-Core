import { MessageConst } from '../util/message-const';

import TYPES from '../types';
import { inject, injectable } from 'inversify';
import container from '../inversify.config';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from './CoreService';
import { ResponseUtil } from '../util/response-utils';
import * as express from 'express';
import 'reflect-metadata';
import to from '../util/promise-utils';

@injectable()
export abstract class CoreController<S extends CoreService<any, any>> {

    public abstract registerCotrollerName(url?:string): String;
    private app: express.Application;
    protected socket: any;

    private service: S;
    private responseUtils: ResponseUtil;

    constructor() {
        this.responseUtils = container.getAll<ResponseUtil>(TYPES.ResponseUtil)[0];
        this.service = container.getAll<S>(TYPES[capitalizeFirstLetter(this.registerCotrollerName()) + "Service"])[0];
    }

    public getService() {
        return this.service;
    }

    public getResponseUtils() {
        return this.responseUtils;
    }


    public getExpressApp(): express.Application {
        return this.app;
    }

    public register(_app: express.Application, io: any): void {
        this.app = _app;
        this.socket = io;
        this.app.route('/api/' + this.registerCotrollerName('url') + '/insertmany')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.service.insertMany(req.body);
                res.json(respone);
            })

        this.app.route('/api/' + this.registerCotrollerName('url') + '/insert')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [error,respone] = await to(this.service.insert(req.body));
                if(error) {
                    res.json(error);
                }
                if(this.registerCotrollerName() == 'registration') {
                    io.sockets.emit('registration', {});
                }

                res.json(respone);
            })

        this.app.route('/api/' + this.registerCotrollerName('url') + '/delete')
            .delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.service.delete(req.query).catch(err => next(err));
                res.json(new ResponseModel<any>(Status._200, "MSG_001", addresses));
            });

        this.app.route('/api/' + this.registerCotrollerName('url') + '/update')
            .put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.service.update(req.body).catch(err => next(err));
                res.json(new ResponseModel<any>(Status._200, "MSG_001", addresses));
            });
        this.app.route('/api/' + this.registerCotrollerName('url') + '/query')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.service.query(req.body).catch(err => next(err));
                res.json(addresses);
            });
    }
}

function capitalizeFirstLetter(text): String {
    return text.charAt(0).toUpperCase() + text.slice(1);
}