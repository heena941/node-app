const validator = require("validator");

const validateSignUpData = ((req) => {
    const {name, emailId, password} = req.body;
    try {
        if(!name) {
            throw new Error("Name is not Empty");
        } else if(!validator.isEmail(emailId)) {
            throw new Error("Email Id is not Valid");
        } else if(!validator.isStrongPassword(password)) {
            throw new Error("Not a Strong Password");
        }

    } catch (err) {
        throw new Error("Validation Failed!!!"+ err);
    }
});

module.exports = validateSignUpData;