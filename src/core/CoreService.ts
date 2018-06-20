import { CounterRepository } from './../repository/CounterRepository';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import to from '../util/promise-utils';
import TYPES from '../types';
import { inject, injectable } from 'inversify';
import { CoreRepository } from './CoreRepository';
import container from '../inversify.config';
import { ResponseModel, Status } from '../model/ResponseDto';

@injectable()
export abstract class CoreService<D, R extends CoreRepository<any>> {
    
    public abstract setMainRepository(): any;

    public async insertMany(obj: D[]) {
        let[err, response] = await to(this.setMainRepository().insert(obj));

        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        return new ResponseModel(Status._200, 'Success', response);
    }

    public async insert(obj: D): Promise<any> {
        let[err, response] = await to(this.setMainRepository().insert([obj]));

        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        return new ResponseModel(Status._200, 'Success', response);
    }

    public async delete(obj: D): Promise<ResponseModel<any>>{
        let[err, response] = await to(this.setMainRepository().delete(obj));

        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        return new ResponseModel(Status._200, 'Success', response);
    }

    public async update(obj: D): Promise<ResponseModel<any>> {
        let[err, response] = await to(this.setMainRepository().update(obj));

        if(err) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        return new ResponseModel(Status._200, 'Success', response);
    }
}