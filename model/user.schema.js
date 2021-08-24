
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    full_name: { type: String, minLength:4, required: true, unique: true },
    user_name: { type: String, unique: true, required: true },
    password: { type: String,required: true},
    mobile_number:{type: Number, minLength:10,maxLength:10, required: true,unique: true},
    token: { type: String },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);