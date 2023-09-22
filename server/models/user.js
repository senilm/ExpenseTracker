const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide name"]
    },
    age:{
        type:Number,
        required:[true,"Please provide age"]
    },
    location:{
        type:String,
        required:[true,"Please provide location"]
    },
    occupation:{
        type:String,
        required:[true,"Please provide occupation"]
    },
    email:{
        type:String,
        required:[true,"Please provide email"],
        match:[ /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide password"]

    }
},{versionKey:false, timestamps:true})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
});


userSchema.methods.verifyPassword= async function(password){
    const pwd = await bcrypt.compare(password, this.password)
    return pwd;
}

userSchema.methods.createJwt = function(){
    return jwt.sign({id:this._id,name:this.name},process.env.ACCESS_TOKEN_KEY,{expiresIn:'30m'})
}
userSchema.methods.createRefJwt = function(){
    return jwt.sign({id:this._id,name:this.name},process.env.REFRESH_TOKEN_KEY,{expiresIn:'1d'})
}

const User = mongoose.model('User', userSchema);

module.exports = User;