const express = require("express");
const paymentRouter = express.Router();
const RazorpayInstance = require("../utils/razorpay");

paymentRouter.post("/payment/create", async (req,res) => {
    try {
        const order = await RazorpayInstance.orders.create({
            "amount" : 100,
            "currency" : "INR",
            "receipt" : "receipt#01",
            "notes" : {
               "membershipType" : "silver"
            },            
        });

        res.json({order});

    } catch(err) {
        console.log(err);
    }
    
});

module.exports = paymentRouter;