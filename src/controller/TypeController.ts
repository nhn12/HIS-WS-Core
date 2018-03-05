import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationPriceService } from '../service/SpecializationPriceService';
import { TypeService } from '../service/TypeService';

@injectable()
export class TypeController implements RegistrableController {
    private typeService: TypeService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.TypeService) _typeService: TypeService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.typeService = _typeService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/type/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.typeService.insert(req.body);
                res.json(respone);
            })

        app.route('/api/type/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.typeService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/type/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.typeService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });
    }
}
