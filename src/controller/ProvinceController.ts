import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ProvinceService } from '../service/ProvinceService';

@injectable()
export class ProvinceController implements RegistrableController {
    private provinceService: ProvinceService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.ProvinceService) _provinceService: ProvinceService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.provinceService = _provinceService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/province/insertmany')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.provinceService.insertMany(req.body);
                res.json(respone);
            })

        app.route('/api/province/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.provinceService.insert(req.body);
                res.json(respone);
            })

        app.route('/api/province/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.provinceService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/province/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.provinceService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });
    }
}
