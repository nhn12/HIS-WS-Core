import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationPriceService } from '../service/SpecializationPriceService';

@injectable()
export class SpecializationPriceController implements RegistrableController {
    private specializationPriceService: SpecializationPriceService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.SpecializationPriceService) _specializationPriceService: SpecializationPriceService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.specializationPriceService = _specializationPriceService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        console.log("controller");
        app.route('/api/specializationPrice/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.specializationPriceService.insert(req.body);
                res.json(respone);
            })

        app.route('/api/specializationPrice/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.specializationPriceService.delete(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/specializationPrice/findbyid')
        .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.specializationPriceService.findOneBy(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });

        app.route('/api/specializationPrice/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            var addresses = await this.specializationPriceService.update(req.body).catch(err => next(err));
            res.json(new ResponseModel<any>(Status._200, "success", addresses));
        });
    }
}
