import { BlueprintScheduleService } from './../service/BlueprintScheduleService';
import { ResponseUtil } from '../util/response-utils';
import { ResponseModel } from '../model/ResponseDto';
import * as express from 'express';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import {RegistrableController} from './RegisterableController';
import { Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreController } from '../core/CoreController';

@injectable()
export class BlueprintScheduleController extends CoreController<any> implements RegistrableController {
    public registerCotrollerName(url?: string): String {
        if(url) {
            return "blueprint-schedule";
        }
        return "blueprintSchedule";
    }
}