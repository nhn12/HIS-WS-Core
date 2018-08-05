import { ResponseUtil } from './../util/response-utils';
import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { ScheduleService } from '../service/ScheduleService';
import to from '../util/promise-utils';
import { CoreController } from '../core/CoreController';

@injectable()
export class ScheduleController extends CoreController<any> implements RegistrableController {

    public registerCotrollerName(): String {
        return "schedule";
    }
}
