import { injectable } from 'inversify';
import { RegistrableController } from './RegisterableController';
import { CoreController } from '../core/CoreController';

@injectable()
export class RoleController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "role";
    }
}
