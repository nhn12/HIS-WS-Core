import { ConfigRepository } from './../repository/ConfigRepository';
import { Status } from './../model/ResponseDto';
import { ResponseModel } from "../model/ResponseDto";
import { injectable, inject } from "inversify";
import TYPES from "../types";
import 'reflect-metadata';
import * as _ from 'lodash';
import axios from 'axios';
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import to from '../util/promise-utils';
import { LogRepository } from '../repository/LogRepository';
import { ConfigDto } from '../model/ConfigDto';
import { LogDto } from '../model/LogDto';


export interface SyncService {
    sync(obj: any, url: string, optional?: any): Promise<any>;
}

@injectable()
export class SyncServiceImpl implements SyncService {

    @inject(TYPES.LogRepository) 
    private logRepository: LogRepository;

    @inject(TYPES.ConfigRepository) 
    private configRepository: ConfigRepository;

    //const config
    WS_URL_SYNC: string = "WS_URL_SYNC";
    WS_ACCOUNT_SYNC_PASSWORD: string = "WS_ACCOUNT_SYNC_PASSWORD";
    WS_ACCOUNT_SYNC_USERNAME: string = "WS_ACCOUNT_SYNC_USERNAME";
    WS_ACCOUNT_SYNC_TOKEN: string = "WS_ACCOUNT_SYNC_TOKEN";


    public async sync(obj: any, url: string, optional?: any): Promise<any> {

        //url = 'HISRoomSchedule/Create';
        // get get config and token|login to vkhs
        let [err, responsePrepare] = await to(this.prepareSync());
        if(err) {
            return Promise.reject(err);
        }

        url = this.truncateUrl(url);

        let [errS, responseS] = await to(this.runSync(obj, 'POST', responsePrepare.url + url, responsePrepare.token, 0));

        if(errS) {
            return Promise.reject(errS);
        }

        return responseS;
    }

    private async runSync(obj, method, url, token, tryAgain: number) {
        
        if(tryAgain == 6) {
            return Promise.reject("Timeout");
        }

        this.logRepository.insert([this.generateLogSync(JSON.stringify({"PRE_SYNC": url, "data": obj}), 'INFO')]);

        //console.log(obj, method, url, token);
        let [err, response] = await to(axios({
            headers: {'X-Custom-Header': 'foobar', "Content-Type": "application/x-www-form-urlencoded", 'Authorization': token},
            data: obj,
            method: method,
            baseURL: url}));
            //console.log(err.response.status);
            // console.log(err);
            // console.log("abcaslk");
            // console.log(response);
        
        if(err) {
            if(err.response && err.response.status == 401) {
                let [errPre, responsePre] = await to(this.prepareSync(true));
                if(errPre || !responsePre) {
                    return this.runSync(obj, method, responsePre.url, responsePre.token, tryAgain++);
                }
            } else {
                let errText = JSON.stringify(err.response.data);
                this.logRepository.insert([this.generateLogSync(errText, 'ERROR')]);
                return Promise.reject(errText);
            }
        }

        this.logRepository.insert([this.generateLogSync(JSON.stringify({respone: response.data, url: url}), 'INFO')]);
        return response.data;
    }

    private async prepareSync(force?: boolean): Promise<{url: string, token: string}> {
        let url;
        let username;
        let password;

        // get domain
        let [err, responseUrl] = await to<ConfigDto>(this.configRepository.findOne({"key": this.WS_URL_SYNC}));
        if(err || !responseUrl) {
            this.logRepository.insert([this.generateLogSync("Cannot get domain vkhs from config", 'ERROR')]);
            return Promise.reject("Domain server not found");
        }
        url = responseUrl.value;

        // get token
        let [errT, responseT] = await to<ConfigDto>(this.configRepository.findOne({"key": this.WS_ACCOUNT_SYNC_TOKEN}));
        if(!errT && responseT && force != true) {
            return {url: url, token: responseT.value}
        } 

        // case token not found --> login to get token

        // get username
        let [errU, responseU] = await to<ConfigDto>(this.configRepository.findOne({"key": this.WS_ACCOUNT_SYNC_USERNAME}));
        if(errU || !responseU) {
            this.logRepository.insert([this.generateLogSync("Cannot get username from config", 'ERROR')]);
            return Promise.reject("Username to access server not found");
        }
        username = responseU.value;

        // get password
        let [errP, responseP] = await to<ConfigDto>(this.configRepository.findOne({"key": this.WS_ACCOUNT_SYNC_PASSWORD}));
        if(errP || !responseP) {
            this.logRepository.insert([this.generateLogSync("Cannot get password from config", 'ERROR')]);
            return Promise.reject("Password to access server not found");
        }
        password = responseP.value;

        let [errL, responseL] = await to(this.loginWs(username, password, url, 0));
        if(errL) {
            this.logRepository.insert([this.generateLogSync("Cannot login to webservis VKHS", 'ERROR')]);
            return Promise.reject("Cannot login to server");
        }

        return {url: url, token: responseL}
    }

    public async loginWs(username: string, password, domain: string, tryAgain?: number): Promise<string> {
        if(tryAgain == 6) {
            return Promise.reject("Timeout");
        }

        let [err, response] = await to(axios({
            headers: {'X-Custom-Header': 'foobar', "Content-Type": "application/x-www-form-urlencoded"},
            data: this.generateBodyLogin(username, password),
            baseURL: domain.replace('api/', 'token')
        }));

        if(err || !response || !response.data || !response.data.access_token || !response.data.token_type) {
            return this.loginWs(username, password, domain,  ++tryAgain);
        }

        await this.setToken(response.data.token_type + ' ' + response.data.access_token);
        return response.token_type + ' ' + response.access_token;
        
    }

    private async setToken(token: string) {
        let config: ConfigDto = new ConfigDto();
        config.key = this.WS_ACCOUNT_SYNC_TOKEN;
        config.value = token;

        await this.configRepository.upsert(config);
        return true;
    }

    private generateLogSync(message: string, type): LogDto {
        let log: LogDto = new LogDto();

        log.type = 'ERROR';
        log.name = 'SYNC';
        log.content = message;
        return log;
    }

    private generateBodyLogin(username: string, password: string) {
        return "grant_type=password&username="+ username + "&password=" + password;
    }

    private truncateUrl(url) {
        if(!url) {
            return url;
        }

        while(url.charAt(0) == '/') {
            url = url.substr(1);
        }

        return url;
    }
}
