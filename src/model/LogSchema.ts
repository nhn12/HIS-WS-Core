import { Schema } from "mongoose";

export var LogSchema: Schema = new Schema({
    id: Number,
    code: String,
    name: String,
    content: String,
    type: String,
    
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});