import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { CoreController } from '../core/CoreController';

@injectable()
export class DistrictController extends CoreController<any> implements RegistrableController {
    public registerCotrollerName(): String {
        return "district";
    }
}
