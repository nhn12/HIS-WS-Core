import { Schema } from "mongoose";

export var IcdCategorySchema: Schema = new Schema({
    id: Number,
    code: {type: String, required : true},
    name: {type: String, required : true},
    note: String,
    description: String,
    allow_description: {type: Boolean, default:false},
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});