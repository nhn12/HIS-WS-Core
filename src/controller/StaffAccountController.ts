import { UserDto } from '../model/UserDto';
import { injectable, inject } from 'inversify';
import { RegistrableController } from './RegisterableController';
import { CoreController } from '../core/CoreController';
import * as express from 'express';
import TYPES from '../types';
import { UserService } from '../service/UserService';
import { UserType } from '../model/UserType';
import to from '../util/promise-utils';
import { ResponseModel, Status } from '../model/ResponseDto';

@injectable()
export class StaffAccountController extends CoreController<any> implements RegistrableController {

    @inject(TYPES.UserService)
    private userService: UserService;

    constructor() {
        super();
    }

    public register(_app: express.Application) {
        super.register(_app, null);
        this.loginRoute();
    }

    private loginRoute() {
        this.getExpressApp().route('/api/' + this.registerCotrollerName('url') + '/login')
        .post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if(!req.body) {
                res.json(this.getResponseUtils().buildAuthenticationFailed());
                return;
            }
            let data: UserDto = req.body;
            data.userType = UserType.STAFF;
            let [err, respone] = await to(this.userService.login(data));
            if(err) {
                res.json(this.getResponseUtils().buildErrorData(err));
                return;
            }
            res.json(new ResponseModel(Status._200, undefined, respone));
        })
    }

    /**
     * Defined controller
     * @param url 
     */
    public registerCotrollerName(url?: string): string {
        if(url) {
            return "staff-account";
        }
        return "StaffAccount";
    }
}
