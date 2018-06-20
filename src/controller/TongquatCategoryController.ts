import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { TongquatCategoryService, TongquatCategoryServiceImpl } from '../service/TongquatCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class TongquatCategoryController extends CoreController<TongquatCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "TongquatCategory";
    }


}
