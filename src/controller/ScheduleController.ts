import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import { ScheduleService } from '../service/ScheduleService';
import to from '../util/promise-utils';

@injectable()
export class ScheduleController implements RegistrableController {
    private scheduleService: ScheduleService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.ScheduleService) _scheduleService: ScheduleService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.scheduleService = _scheduleService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/schedule/insert')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, addresses] = await to(this.scheduleService.insert(req.body));
                if(err) {
                    return res.json(this.responseUtils.buildErrorData(JSON.stringify(err)));
                }
                res.json(addresses);
            })

        app.route('/api/schedule/update')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, addresses] = await to(this.scheduleService.update(req.body));
            if(err) {
                return res.json(this.responseUtils.buildErrorData(JSON.stringify(err)));
            }
            res.json(addresses);
        })

        app.route('/api/schedule/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, addresses] = await to(this.scheduleService.delete(req.body));
            if(err) {
                return res.json(this.responseUtils.buildErrorData(JSON.stringify(err)));
            }
            res.json(addresses);
        })
    }
}
