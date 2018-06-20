import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { CacBoPhanCategoryService, CacBoPhanCategoryServiceImpl } from '../service/CacBoPhanCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class CacBoPhanCategoryController extends CoreController<CacBoPhanCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "CacBoPhanCategory";
    }


}
