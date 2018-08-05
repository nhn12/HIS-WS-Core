import { Schema } from "mongoose";

export var SpecializationSchema: Schema = new Schema({
    id: {type: Number, required: true},
    specialization_code: Schema.Types.ObjectId,
    name: String,
    hospital_id: {type: Number, ref: "hospital_tbl", required: true},
    
    has_sync: { type: Boolean, default: false },
    //audit tbl
    created_by: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    deleted_flag: { type: Boolean, default: false }
});