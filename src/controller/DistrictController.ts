import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { DistrictService } from '../service/DistrictService';

@injectable()
export class DistrictController implements RegistrableController {
    private districtService: DistrictService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.DistrictService) _districtService: DistrictService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.districtService = _districtService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/district/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.districtService.insert(req.body);
                res.json(respone);
            })
        
            app.route('/api/district/insertmany')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.districtService.insertMany(req.body);
                res.json(respone);
            })

        app.route('/api/district/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.districtService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/district/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.districtService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });
    }
}
