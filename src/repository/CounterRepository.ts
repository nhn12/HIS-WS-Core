import { CounterSchema } from './../model/CounterSchema';
import { WardSchema } from './../model/WardSchema';
import { WardDto } from './../model/WardDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import to from '../util/promise-utils'

export interface CounterRepository {
    getNextSequenceValue(sequenceName): Promise<number>;
}

@injectable()
export class CounterRepositoryImpl implements CounterRepository {
    col: mongoose.Model<any>;

    constructor() {
        this.col = mongoose.model('counters_tbl', CounterSchema, 'counters_tbl');
    }

    async getNextSequenceValue(sequenceName: any): Promise<number> {
        var seq = await this.col.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return seq.sequence_value;
    }

    
}