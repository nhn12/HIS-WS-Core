import { Status } from './../model/ResponseDto';
import { ResponseModel } from "../model/ResponseDto";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import 'reflect-metadata';
import * as _ from 'lodash';


export interface SyncService {
    sync(obj: any, url: string, optional?: any): Promise<ResponseModel<any>>;
}

@injectable()
export class SyncServiceImpl implements SyncService {
    public async sync(obj: any, url: string, optional?: any): Promise<ResponseModel<any>> {
        var baseUrl = "http://api.vkhs.vn/api/";
        var fullUrl = baseUrl + url;
        console.log(fullUrl);
        console.log(obj);
        return new ResponseModel(Status._200, "sync success");
    }
        

  
}
