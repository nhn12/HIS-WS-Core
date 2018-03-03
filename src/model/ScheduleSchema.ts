import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var SchedulerSchema: Schema = new Schema({
    id: Number,
    schedule_code: Schema.Types.ObjectId,
    start_time: Date,
    end_time: Date,
    type: String,

    is_interval: Boolean,
    period: Number,

    reserve: {type: Boolean, default: false},
    channel: String,
    has_sync: {type: Boolean, default: false},

    ward_id: Number,
    specialization_id: Number,

    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});