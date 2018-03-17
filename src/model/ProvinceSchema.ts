import { Schema } from "mongoose";

export var ProvinceSchema: Schema = new Schema({
    id: Number,
    code: {type: String, required : true},
    name: String,
    district_id: Number,
    
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});