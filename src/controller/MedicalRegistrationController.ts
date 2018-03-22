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

    public register(app: express.Application, io: any): void {

        app.route('/api/MedicalRegistration/notify').post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, response] = await to(this.registartionService.getone(req.body.madkkb));
            io.emit('new_registration', {data: response});
            res.json(response);
        });

        app.route('/api/MedicalRegistration/create')
            .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
                const [err, response] = await to(this.registartionService.insert(req.body));
                io.emit('new_registration', {data: response});
                res.json(response);
        })

        app.route('/api/MedicalRegistration/UpdatePayment')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, response] = await to(this.registartionService.update(req.body));
            res.json(response);
        })
        
        app.route('/api/registration/delete')
        .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
            const [err, response] = await to(this.registartionService.delete(req.body));
            res.json(response);
        })
    }
}
