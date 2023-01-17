const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")




const UserSchema =  new mongoose.Schema({

    avatar:{
        public_id:String,
        url:String,
    },

    name:{
        type:String,
        required:[true,"Please add a name"],
    },

    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:[true,"Email alerady exist"],
    },
    password:{
        type:String,
        required:[true,"Please enter PassworS"],
        minlength:[6,"minimum lenght should be 6"],
        select :false,
    },

    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",
    },],

    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ]

})

UserSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next();    
});

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.method.generateToken = function ()
{
    return jwt.sign({
        _id:this._id
    },process.env.JWT_SECERT);
}
module.exports = mongoose.model("user",UserSchema);