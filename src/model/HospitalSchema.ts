import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var HospitalSchema: Schema = new Schema({
    id: Number,
    hispital_code: Schema.Types.ObjectId,
    code: String,
    name: String,
    address: String,
    phone: String,
    image: String,
    hospital_type: String,
    status: {type: Boolean, default: true},
    last_visit: Date,

    // Relationship defination
    doctor_id: [{ type: Number, ref: 'doctor_tbl' }],
    province_id: {type: Number, ref: 'province_tbl'},
    commune_id: {type: Number, ref: 'commune_tbl'},
    district_id: {type: Number, ref: 'district_tbl'},

    has_sync: {type: Boolean, default: false},
    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});
