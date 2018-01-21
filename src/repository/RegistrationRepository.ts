import {injectable} from 'inversify';
import * as mongoose from 'mongoose';
import { RegistrationSchema } from '../model/RegistrationSchema';
import { RegistrationDto } from '../model/RegistrationDto';


export interface RegistrationRepository {
    findAll(): Promise<Array<RegistrationDto>>;
    insert(obj: RegistrationDto): Promise<RegistrationDto>;
}

@injectable()
export class RegistrationRepositoryImpl implements RegistrationRepository {
    col;
    constructor() {
        // var mongoose = require('mongoose');
        var Schema = mongoose.Schema;
        this.col = mongoose.model('registration_tbl', RegistrationSchema );
    }

    public async findAll(): Promise<Array<RegistrationDto>> {
        return this.col.find({
            email: null
        });
    }

    public async insert(obj: RegistrationDto): Promise<RegistrationDto> {
        return this.col.insertMany([obj]);
    }
}