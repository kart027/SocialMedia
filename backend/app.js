const express = require("express");
const { connectDatabase } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({path:"backend/config/config.env"});
connectDatabase();

// using mildware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


// importing routes
const post = require("./routes/post");
const User = require("./routes/user");



// using routes
app.use("/api/v1",post);
app.use("/api/v1",User);


module.exports = app;