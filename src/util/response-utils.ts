import { MessageConst } from './message-const';
import { ResponseModel, Status } from "../model/ResponseDto";
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';

export interface ResponseUtil {
    buildListData<T>(status: Status, message: string, data: T[], totalRecord:  number): ResponseModel<T>;
    buildAuthenticationFailed(): ResponseModel<any>;
    buildErrorData(message: string): ResponseModel<string>;
}

@injectable()
export class ResponseUtilImp implements ResponseUtil {
    buildListData<T>(status: Status, message: string, data: T[], totalRecord:  number): ResponseModel<T> {
        var response: ResponseModel<T> = new ResponseModel<T>(status, message, MessageConst[message]);
        response.setDataList({results: data, maxResults: totalRecord});
        return response;
    }

    buildAuthenticationFailed(): ResponseModel<any> {
        return new ResponseModel(Status._401, "ERR_003", MessageConst.ERR_003);
    }

    buildErrorData(messageCode: string): ResponseModel<string> {
        return new ResponseModel(Status._500, messageCode, MessageConst[messageCode]);
    }
}