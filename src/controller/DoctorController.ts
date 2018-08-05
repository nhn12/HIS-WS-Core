import { DoctorService } from '../service/DoctorService';
import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import {RegistrableController} from './RegisterableController';
import { ResponseUtil } from '../util/response-utils';
import { Status, ResponseModel } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ProvinceService } from '../service/ProvinceService';
import { CoreController } from '../core/CoreController';

@injectable()
export class DoctorController extends CoreController<any> implements RegistrableController {
    public registerCotrollerName(): String {
        return "doctor";
    }
}
