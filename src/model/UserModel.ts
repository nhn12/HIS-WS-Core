import { Schema, model } from "mongoose";
var bcrypt =  require('bcrypt');

export var UserSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

model('user_tbl', UserSchema);
