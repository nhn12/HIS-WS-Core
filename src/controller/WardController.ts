import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { WardService } from '../service/WardService';

@injectable()
export class WardController implements RegistrableController {
    private wardService: WardService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.WardService) _wardService: WardService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.wardService = _wardService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/ward/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.wardService.insert(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
            })

            app.route('/api/ward/update')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.wardService.update(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
            })

            app.route('/api/ward/delete')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.wardService.delete(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
            })
    }
}
