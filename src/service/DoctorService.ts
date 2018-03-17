import { DoctorRepository } from './../repository/DoctorRepository';
import { DoctorDto } from './../model/DoctorDto';
import { ScheduleDto } from './../model/ScheduleDto';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';
import { ResponseModel, Status } from '../model/ResponseDto';
import to from '../util/promise-utils';
import { CoreService } from '../core/CoreService';
import { SyncService } from '../service/SyncService';


export interface DoctorService {
    insert(obj: DoctorDto): Promise<any>;
    delete(obj: DoctorDto): Promise<ResponseModel<any>>;
    update(obj: DoctorDto): Promise<ResponseModel<any>>;
}

@injectable()
export class DoctorServiceImpl extends CoreService<DoctorDto, any> implements DoctorService {

    @inject(TYPES.DoctorRepository)
    protected mainRepository: DoctorRepository;
    @inject(TYPES.SyncService)
    private syncService: SyncService;

    public setMainRepository() {
        return this.mainRepository;
    }

    public async insert(obj: DoctorDto): Promise<any> {

        let [err, response] = await to(super.insert(obj));
        //response array
        if (err || !response) {
            return new ResponseModel(Status._500, JSON.stringify(err), null);
        }

        console.log(response);

        this.Sync(response);
        return response;

    }

    public convertToSyncDTO(object: any) {
        var Gender
        if (object.data[0].gender == 0) {
            Gender = true;
        }
        else {
            Gender = false;
        }

        var SyncDTO = {
            HisId: object.data[0].id,
            Code: object.data[0].id,
            FullName: object.data[0].firstname + object.data[0].lastname,
            Gender: Gender
        };
        return SyncDTO;
    }

    public Sync(obj: any) {
        let tmp = this.convertToSyncDTO(obj)
        console.log(tmp);
        //open comment when use it
        //this.syncService.sync(tmp, "HISDoctor/Create", null);

    }

}
