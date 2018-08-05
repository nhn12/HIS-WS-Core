import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/response-utils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ProvinceService } from '../service/ProvinceService';
import { CoreController } from '../core/CoreController';

@injectable()
export class ProvinceController extends CoreController<any> implements RegistrableController {
    public registerCotrollerName(): String {
        return "province";
    }
}
