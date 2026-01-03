const connectDB = require("./config/database");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
require("dotenv").config();
const paymentRouter = require("./routes/payment");

app.use(express.json());

app.use("/", authRouter);
app.use("/", paymentRouter);

connectDB().then(() => {
    app.listen(process.env.PORT);
    console.log("DB connect successfully");
}).catch((err) => {
    console.log(err);
});