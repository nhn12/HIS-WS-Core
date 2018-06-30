import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/ResponseUtils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationPriceService } from '../service/SpecializationPriceService';
import { TypeService } from '../service/TypeService';
import { CoreController } from '../core/CoreController';
import { CategoryService } from '../service/CategoryService';
import { TypeRepository } from '../repository/TypeRepository';

@injectable()
export class TypeController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "type";
    }

 
}
