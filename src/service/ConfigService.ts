import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { ConfigRepository } from '../repository/ConfigRepository';
import { ConfigDto } from '../model/ConfigDto';
import { CoreService } from '../core/CoreService';


export interface ConfigService {
    insert(obj: any): Promise<ResponseModel<any>>;
    delete(obj: ConfigDto): Promise<ResponseModel<any>>;
    update(obj: ConfigDto): Promise<ResponseModel<any>>;
}

@injectable()
export class ConfigServiceImpl extends CoreService<ConfigDto ,any> implements ConfigService {

    @inject(TYPES.ConfigRepository)
    private ConfigRepository: ConfigRepository;

    public registerServiceName() {
        return "config";
    }
}
