import { Schema } from "mongoose";

export var TypeSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: String,
    code: String,
    class: String,
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});