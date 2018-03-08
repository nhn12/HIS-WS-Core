// import { LogService } from './../service/LogService';
// import { DoctorService } from './../service/DoctorService';
// import * as express from 'express';
// import {injectable, inject} from 'inversify';
// import TYPES from '../types';
// import 'reflect-metadata';
// import {RegistrableController} from './RegisterableController';
// import { ResponseUtil } from '../util/ResponseUtils';
// import { Status, ResponseModel } from '../model/ResponseDto';
// import to from '../util/promise-utils';
// import { ProvinceService } from '../service/ProvinceService';

// @injectable()
// export class LogController implements RegistrableController {
//     private provinceService: LogService;
//     private responseUtils: ResponseUtil;

//     constructor(@inject(TYPES.LogService) _provinceService: LogService,
//                 @inject(TYPES.ResponseUtil) _responseUtils: ResponseUtil) {
//         this.provinceService = _provinceService;
//         this.responseUtils = _responseUtils;
//     }

//     public register(app: express.Application): void {
//         app.route('/api/log/insert')
//             .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
//                 const respone = await this.provinceService.insert(req.body);
//                 res.json(respone);
//             })

//         app.route('/api/log/delete')
//         .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
//             var addresses = await this.provinceService.delete(req.body).catch(err => next(err));
//             res.json(new ResponseModel<any>(Status._200, "success", addresses));
//         });

//         app.route('/api/doctor/update')
//         .post(async(req: express.Request, res: express.Response, next: express.NextFunction) => {
//             var addresses = await this.provinceService.update(req.body).catch(err => next(err));
//             res.json(new ResponseModel<any>(Status._200, "success", addresses));
//         });
//     }
// }
