import { Schema } from "mongoose";

export var CommuneSchema: Schema = new Schema({
    id: Number,
    code: String,
    name: String,
    district_id: Number,
    district_code: String,
    
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});