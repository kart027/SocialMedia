const mongoose = require("mongoose");

exports.connectDatabase = () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then((c)=>console.log("database connected"));

       
};  