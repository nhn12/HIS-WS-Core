import { Schema } from "mongoose";

export var StaffAccountSchema: Schema = new Schema({
    id: Number,
    code: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status: {default: 1, required: true, type: Number},
    staff_id: {type: Number, required: true, ref: 'staff_tbl'},
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});