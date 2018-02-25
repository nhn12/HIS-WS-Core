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
        var response: ResponseModel<T> = new ResponseModel<T>(status, message);
        response.setDataList({results: data, totalRecords: totalRecord});
        return response;
    }

    buildAuthenticationFailed(): ResponseModel<any> {
        return new ResponseModel(Status._401, "Authentication falied. User not found")
    }

    buildErrorData(message: string): ResponseModel<string> {
        return new ResponseModel(Status._500, message);
    }
}