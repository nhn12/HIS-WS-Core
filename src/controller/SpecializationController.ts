import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationService } from '../service/SpecializationService';

@injectable()
export class SpecializationController implements RegistrableController {
    private specializationService: SpecializationService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.SpecializationService) _specializationService: SpecializationService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.specializationService = _specializationService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/specialization/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.specializationService.insert(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                    return;
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
                return;
            })
    }
}