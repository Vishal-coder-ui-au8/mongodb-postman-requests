const express = require("express");
const app=express();
const apiRoute = require("./routes/api");
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
require("dotenv/config");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", err => {
    console.log("connection failed");
});

mongoose.connection.on("connected", connected=>{
    console.log("connected to the database");
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api", apiRoute);

app.use((req,res,next) => {
    res.status(404).json({
         error: "bad request"
    })
})

module.exports = app;