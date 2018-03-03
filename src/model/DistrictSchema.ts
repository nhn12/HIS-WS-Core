import { Schema } from "mongoose";

export var DistrictSchema: Schema = new Schema({
    id: Number,
    code: String,
    name: String,
    is_interval: Boolean,
    province_id: Schema.Types.ObjectId,
    
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});