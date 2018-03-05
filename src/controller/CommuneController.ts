import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CommuneService } from '../service/CommuneService';

@injectable()
export class CommuneController implements RegistrableController {
    private communeService: CommuneService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.CommuneService) _communeService: CommuneService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.communeService = _communeService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/commune/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.communeService.insert(req.body);
                res.json(respone);
            })

        app.route('/api/commune/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.communeService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/commune/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.communeService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });
    }
}
