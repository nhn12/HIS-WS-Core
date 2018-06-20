import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { TiencanCategoryService, TiencanCategoryServiceImpl } from '../service/TiencanCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class TiencanCategoryController extends CoreController<TiencanCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "TiencanCategory";
    }


}
