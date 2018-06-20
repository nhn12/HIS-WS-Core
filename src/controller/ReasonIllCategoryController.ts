import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { ReasonCategoryService, ReasonCategoryServiceImpl } from '../service/ReasonCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class ReasonCategoryController extends CoreController<ReasonCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "ReasonCategory";
    }


}
