import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var DoctorSchema: Schema = new Schema({
    id: Number,
    code: Schema.Types.ObjectId,
    name: String,
    firstname: String,
    lastname: String,
    gender: String,
    birthday: String,

    address: String,
    province_id: Number,
    district_id: Number,
    commune_id: Number,

    specialization_id: Number,


    has_sync: {type: Boolean, default: false},
    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});
