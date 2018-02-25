import { ScheduleDto } from './../model/ScheduleDto';
import {injectable, inject} from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { SpecializationRepository } from '../repository/SpecializationRepository';


export interface SpecializationService {
    insert(obj: any): Promise<any>;
    update(obj: any): Promise<ResponseModel<any>>;
}

@injectable()
export class SpecializationServiceImpl implements SpecializationService {
    @inject(TYPES.SpecializationRepository)
    private scheduleRepository: SpecializationRepository;


    public async insert(obj: any): Promise<any> {
        return await this.scheduleRepository.insert(obj);
    }

    public async update(obj: any): Promise<ResponseModel<any>> {
        throw new Error("Method not implemented.");
    }

  




 
}
