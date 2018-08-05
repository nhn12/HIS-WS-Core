import { Schema } from "mongoose";

export var StaffSchema: Schema = new Schema({
    id: {type: Number, required: true},
    name: String,
    code: String,
    hospital_id: {type: Number,ref: 'hospital_tbl'},
    email: String,
    has_sync: { type: Boolean, default: false },
    actual_role: String,
    role: {type: Number, ref: 'role_tbl'},
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});