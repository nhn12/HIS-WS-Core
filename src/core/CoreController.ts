
import TYPES from '../types';
import { inject, injectable } from 'inversify';
import container from '../inversify.config';
import { ResponseModel, Status } from '../model/ResponseDto';
import { CoreService } from './CoreService';
import { ResponseUtil } from '../util/ResponseUtils';
import * as express from 'express';

@injectable()
export abstract class CoreController<S extends CoreService<any, any>> {

    public abstract registerCotrollerName(): String;
    private app: express.Application;


    private service: S;
    private responseUtils: ResponseUtil;

    constructor() {
        this.responseUtils = container.getAll<ResponseUtil>(TYPES.ResponseUtil)[0];
        this.service = container.getAll<S>(TYPES[capitalizeFirstLetter(this.registerCotrollerName()) + "Service"])[0];
    }


    public getExpressApp(): express.Application {
        return this.app;
    }

    public register(_app: express.Application): void {
        this.app = _app;
        this.app.route('/api/' + this.registerCotrollerName() + '/insertmany')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.service.insertMany(req.body);
                res.json(respone);
            })

        this.app.route('/api/' + this.registerCotrollerName() + '/insert')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.service.insert(req.body);
                res.json(respone);
            })

        this.app.route('/api/' + this.registerCotrollerName() + '/delete')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.service.delete(req.body).catch(err => next(err));
                res.json(new ResponseModel<any>(Status._200, "success", addresses));
            });

        this.app.route('/api/' + this.registerCotrollerName() + '/update')
            .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                var addresses = await this.service.update(req.body).catch(err => next(err));
                res.json(new ResponseModel<any>(Status._200, "success", addresses));
            });
    }
}

function capitalizeFirstLetter(text): String {
    return text.charAt(0).toUpperCase() + text.slice(1);
}