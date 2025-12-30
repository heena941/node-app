const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validateSignUpData = require("../utils/validations");
const bcrypt = require("bcrypt");
const rateLimit = require('express-rate-limit');

// ============================================
// RATE LIMITER - DISTRIBUTED ACROSS INSTANCES
// ============================================
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per 1 minutes
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed attempts
});

authRouter.post("/signUp", async (req,res) => {

    try {
        const {name, emailId, password} = req.body;

        // validate the sign up data
        validateSignUpData(req);
        
        // encrpt the password
        const hashPassword = await bcrypt.hash(password, 10);

        // check uses is existed
        const existedUser = await User.findOne({emailId});
        if(!existedUser) {
           return res.status(409).json({ error: 'User already exists' });
        }

        const user = new User({
            name,
            emailId,
            password : hashPassword
        });

        await user.save();
        res.json({
            message : "Register SuccessFully",
            data : user
        })

    } catch (err) {
        res.status(404).send("ERROR! " + err.message);
    }
  
});

authRouter.get("/signIn", loginLimiter, async (req, res) => {
     try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user) {
            throw new Error("Invalid Creditionals");
        } 

        const isValidPassword = await user.validatePassword(password);
        if(isValidPassword) {
            // const token = await user.getJwt();
            // res.cookie("token", token, {
            //     expire: new Date(Date.now() + 86400000),
            //     httpOnly : true});
            
            res.send("Login Successful!!");
        } else {
            throw new Error("Invalid Creditionals");
        }
    } catch(err) {
        res.status(404).send("ERROR! " + err.message);
    }
});

module.exports = authRouter;