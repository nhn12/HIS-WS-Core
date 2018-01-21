import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { MedicalRegistrationService } from '../service/MedicalRegistrationService';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';

@injectable()
export class MedicalRegistrationController implements RegistrableController {
    private registartionService: MedicalRegistrationService;
    private responseUtils: ResponseUtil;

    constructor(@inject(TYPES.MedicalRegistrationService) _registartionService: MedicalRegistrationService,
                @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
        this.registartionService = _registartionService;
        this.responseUtils = _responseUtils;
    }

    public register(app: express.Application): void {
        app.route('/api/registration/search')
            .get(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const addresses = await this.registartionService.getAllRegistration().catch(err => next(err));
                res.json(this.responseUtils.buildListData<any>(Status._200, "success", addresses, addresses.length));
        })

        app.route('/api/registration/create')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, response] = await to(this.registartionService.insert(req.params["mabv"], req.body));
                res.json(response);
        })
    }
}
