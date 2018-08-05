import { ResponseUtil } from '../util/response-utils';
/**
 * @author NamNguyen
 * @email nhn12.hoangnam@gmail.com
 * @create date 2018-07-23 02:14:31
 * @modify date 2018-07-23 02:14:31
 * @desc Implement for core service
*/


import to from '../util/promise-utils';
import TYPES from '../types';
import { injectable, inject } from 'inversify';
import { CoreRepository } from './CoreRepository';
import container from '../inversify.config';
import { ResponseModel, Status } from '../model/ResponseDto';

@injectable()
export abstract class CoreService<D, R extends CoreRepository<any>> {
    private _repository: CoreRepository<D>;

    @inject(TYPES.ResponseUtil)
    protected responseUtils: ResponseUtil;

    constructor() {
        this._repository = container.getAll<CoreRepository<D>>(TYPES[capitalizeFirstLetter(this.registerServiceName()) + "Repository"])[0];
    }

    public get repository(): CoreRepository<D> {
        return this._repository;
    }

    public abstract registerServiceName(): string;

    /**
     * Implement for insert many data
     * @param obj
     */
    public async insertMany(obj: D[]) {
        let [err, response] = await to(this.repository.insert(obj));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        return new ResponseModel(Status._200, 'MSG_001', response);
    }

    /**
     * Implement for insert data
     * @param obj 
     */
    public async insert(obj: D): Promise<any> {
        let [err, response] = await to(this.repository.insert([obj]));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        return new ResponseModel(Status._200, 'MSG_001', response);
    }

    /**
     * Implement delete data
     * @param obj 
     */
    public async delete(obj: D): Promise<ResponseModel<any>> {
        let [err, response] = await to(this.repository.delete(obj));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        return new ResponseModel(Status._200, 'MSG_001', response);
    }


    /**
     * Implement update data
     * @param obj 
     */
    public async update(obj: D): Promise<ResponseModel<any>> {
        let [err, response] = await to(this.repository.update(obj));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        return new ResponseModel(Status._200, 'MSG_001', response);
    }

    /**
     * Implement update data
     * @param obj 
     */
    public async getOne(obj: D): Promise<ResponseModel<any>> {
        let [err, response] = await to(this.repository.findOneBy(obj));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        return new ResponseModel(Status._200, 'MSG_001', response);
    }

    /**
     * Implement query data
     * @param obj 
     */
    public async query(obj: any): Promise<ResponseModel<any>> {
        let skip: number = obj&&obj.paging
        let [err, response] = await to(this.repository.query(obj.filter, obj.order, obj.offset, obj.limit, null));

        if (err) {
            return new ResponseModel(Status._500, 'ERR_001', JSON.stringify(err));
        }

        if (response[0] && response[0].totalRecords && response[0].totalRecords.length > 0) {
            return this.responseUtils.buildListData<any>(Status._200, "success", response[0].data, response[0].totalRecords[0].madkkb);
        } else {
            return this.responseUtils.buildListData<any>(Status._200, "success", [], 0);
        } 
    }
}

function capitalizeFirstLetter(text): String {
    return text.charAt(0).toUpperCase() + text.slice(1);
}