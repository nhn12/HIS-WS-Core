import { Schema } from "mongoose";

export var SpecializationPriceSchema: Schema = new Schema({
    id: Number,
    specialization_id: Number,
    type: Number,
    price: Number,
    from_date: Date,
    to_date: Date,
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});