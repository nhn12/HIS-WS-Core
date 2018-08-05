import { Schema } from "mongoose";

export var RoleSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, required: true},
    operation: [{type: String, ref: 'operation_tbl'}],
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});