import { Schema } from "mongoose";

export var OperationSchema: Schema = new Schema({
    id: {type: String, required : true},
    code: {type:String, required: true, unique: true},
    name: String,
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});