import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { IcdCategoryService, IcdCategoryServiceImpl } from '../service/IcdCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class IcdCategoryController extends CoreController<IcdCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "IcdCategory";
    }


}
