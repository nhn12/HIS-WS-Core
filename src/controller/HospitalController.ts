import { injectable } from 'inversify';
import { RegistrableController } from './RegisterableController';
import { CoreController } from '../core/CoreController';

@injectable()
export class HospitalController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "hospital";
    }
}
