import { Schema } from "mongoose";

export var TongquatCategorySchema: Schema = new Schema({
    id: Number,
    code: {type: String, required : true},
    name: {type: String, required : true},
    note: String,description: String,
    allow_description: {type: Boolean, default:false},
    unit: {type: String, required: true},
    allow_unit: {type: Boolean, default: false},
    alias: {type: String, default: false},
    type: {type: String, default: false},
    required: {type: Boolean, default: false},
    order: {type: Number, default: 0},
    has_multifield: {type: Boolean, default: false},
    number_field: {type: Number, default: 1},

    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});