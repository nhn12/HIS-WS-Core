import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var WardSchema: Schema = new Schema({
    id: Number,
    ward_code: {type: Schema.Types.ObjectId, index: true, required: true, auto: true,},
    name: String,
    specialization_id: {type: Number, ref: 'specialization_tbl'},
    hospital_id:Number,

    has_sync: {type: Boolean, default: false},
    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});