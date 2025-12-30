const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        index: true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    photoUrl : {
        type : String
    }
});

UserSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;

    const isValidPassword = await bcrypt.compare(
        passwordInputByUser,
        user.password
    );
    return isValidPassword;
}

module.exports = mongoose.model("User", UserSchema);