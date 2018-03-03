import { CounterSchema } from './../model/CounterSchema';
import { WardSchema } from './../model/WardSchema';
import { WardDto } from './../model/WardDto';
import { injectable, inject } from 'inversify';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import to from '../util/promise-utils'

export interface CounterRepository {
    getNextSequenceValue(sequenceName, quantity?: number): Promise<number>;
}

@injectable()
export class CounterRepositoryImpl implements CounterRepository {
    col: mongoose.Model<any>;

    constructor() {
        this.col = mongoose.model('counters_tbl', CounterSchema, 'counters_tbl');
    }

    public async getNextSequenceValue(sequenceName: any, quantity?: Number): Promise<number> {
        if(quantity == null || quantity == undefined) {
            quantity = 1;
        }

        var seq = await this.col.findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: quantity } },
            { new: true, upsert: true }
        );

        return seq.sequence_value;
    }

    
}