import {injectable, inject} from 'inversify';
import {RegistrableController} from './RegisterableController';
import { TrieuchungCategoryService, TrieuchungCategoryServiceImpl } from '../service/TrieuchungCategoryService';
import { CoreController } from '../core/CoreController';

@injectable()
export class TrieuchungCategoryController extends CoreController<TrieuchungCategoryServiceImpl> implements RegistrableController {

    public registerCotrollerName(): String {
        return "TrieuchungCategory";
    }


}
