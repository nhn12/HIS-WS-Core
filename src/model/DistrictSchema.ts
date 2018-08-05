import { Schema } from "mongoose";

export var DistrictSchema: Schema = new Schema({
    id: Number,
    code: String,
    name: String,
    has_sync: { type: Boolean, default: false },
    province_id: {type: Number, ref: "province_tbl"},
    province_code: String,
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});