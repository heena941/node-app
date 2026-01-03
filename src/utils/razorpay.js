const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id : process.env.RAZ_KEY_ID,
    key_secret : process.env.RAZ_SECRET_KEY
});

module.exports = instance;