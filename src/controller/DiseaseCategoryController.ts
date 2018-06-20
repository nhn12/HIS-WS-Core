import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { CoreController } from '../core/CoreController';
import { DiseaseCategoryServiceImpl } from '../service/DiseaseCategoryService';

@injectable()
export class DiseaseCategoryController extends CoreController<DiseaseCategoryServiceImpl> implements RegistrableController {
    public registerCotrollerName(): String {
        return "DiseaseCategory";
    }
}
