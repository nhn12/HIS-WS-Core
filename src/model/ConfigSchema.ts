import { Schema } from "mongoose";

export var ConfigSchema: Schema = new Schema({
    id: Number,
    key: String,
    value: String,

    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});