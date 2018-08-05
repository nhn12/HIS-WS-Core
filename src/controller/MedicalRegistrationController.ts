import * as express from 'express';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { RegistrableController } from './RegisterableController';
import { ResponseUtil } from '../util/response-utils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreController } from '../core/CoreController';

@injectable()
export class MedicalRegistrationController extends CoreController<any> implements RegistrableController {
    public registerCotrollerName(): String {
        return "registration";
    }

    public register(_app: express.Application, io): void {
        super.register(_app, io);
        _app.route('/api/registration/getBaNumber')
            .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.getService().getBaNumber();
                res.json(respone);
            })

        _app.route('/api/registration/getCvNumber')
            .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const respone = await this.getService().getCvNumber();
                res.json(respone);
            })
    }
}
