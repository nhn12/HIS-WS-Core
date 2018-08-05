import {RegistrableController} from './RegisterableController';
import { CoreController } from '../core/CoreController';
import { injectable } from '../../node_modules/inversify';

@injectable()
export class TypeController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "type";
    }

 
}
