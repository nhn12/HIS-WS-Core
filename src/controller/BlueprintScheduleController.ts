import { ResponseModel } from './../model/ResponseDto';
import { BlueprintScheduleService } from './../service/BlueprintScheduleService';
import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status } from '../model/ResponseDto';
import to from '../util/promise-utils';

@injectable()
export class BlueprintScheduleController implements RegistrableController {
    private scheduleService: BlueprintScheduleService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.BlueprintScheduleService) _scheduleService: BlueprintScheduleService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.scheduleService = _scheduleService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/blueprint_schedule/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.scheduleService.insert(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
        })

        app.route('/api/blueprint_schedule/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, addresses] = await to(this.scheduleService.update(req.body));
            if(err) {
                res.json(this.responseUtils.buildErrorData(err));
            }
            res.json(new ResponseModel(Status._200, "success", addresses));
    })

        app.route('/api/blueprint_schedule/delete')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.scheduleService.delete(req.body));
                if(err) {
                    res.json(this.responseUtils.buildErrorData(err));
                }
                res.json(new ResponseModel(Status._200, "success", addresses));
        })
    }
}
