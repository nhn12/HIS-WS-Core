import { injectable } from 'inversify';
import { RegistrableController } from './RegisterableController';
import { CoreController } from '../core/CoreController';

@injectable()
export class OperationController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "operation";
    }
}
