import { Status } from './../model/ResponseDto';
import { ResponseModel } from "../model/ResponseDto";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import 'reflect-metadata';
import * as _ from 'lodash';
import axios from 'axios';
import { AxiosRequestConfig, AxiosPromise } from 'axios';


export interface SyncService {
    sync(obj: any, url: string, optional?: any): Promise<ResponseModel<any>>;
}

@injectable()
export class SyncServiceImpl implements SyncService {
    
    public async sync(obj: any, url: string, optional?: any): Promise<ResponseModel<any>> {
        console.log(obj);
        return new ResponseModel(Status._200, "sync success");
    }

    private prepareSync(): Promise<string> {
        //TO_DO
        return null;
    }

    private loginWs(): Promise<string> {
        //TO_DO
        return null;
    }

    private runSync() {
        //TO_DO
    }
        

  
}
