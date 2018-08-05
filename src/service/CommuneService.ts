import { CommuneDto } from '../model/CommuneDto';
import { CommuneRepository } from '../repository/CommuneRepository';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';

export interface CommuneService {
    insert(obj: CommuneDto): Promise<any>;
    insertMany(obj: CommuneDto[]): Promise<any>;
    delete(obj: CommuneDto): Promise<ResponseModel<any>>;
    update(obj: CommuneDto): Promise<ResponseModel<any>>;
    query(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class CommuneServiceImpl extends CoreService<CommuneDto, any> implements CommuneService {
    public registerServiceName() {
        return "commune";
    }
}
