import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var BlueprintScheduleSchema: Schema = new Schema({
    id: Number,
    start_time: String,
    end_time: String,
    ward_id: Number,
    doctor_id: Number,
    specialization_id: Number,
    period: Number,
    hospital_id: Number,

    has_sync: {type: Boolean, default: false},

    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});