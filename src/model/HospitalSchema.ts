import { Schema } from "mongoose";
import { ObjectID } from "bson";

export var HospitalSchema: Schema = new Schema({
    id: Number,
    hispital_code: Schema.Types.ObjectId,
    name: Date,

    address: String,
    phone: String,
    image: String,

    has_sync: {type: Boolean, default: false},
    //audit tbl
    created_by: String,
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    deleted_flag: {type: Boolean, default: false}
});
