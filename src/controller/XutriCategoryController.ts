import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { XutriCategoryService, XutriCategoryServiceImpl } from '../service/XutriCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class XutriCategoryController extends CoreController<XutriCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "XutriCategory";
    }


}
