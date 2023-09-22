const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:[true, "Please provide amount"],
        maxLength:20,
        trim:true
    },
    category :{
        type:String,
        required:true,
        trim:true,
        enum:['job', 'dropshipping','stocks', 'youtube', 'rent','other']
    },
    type:{
        type:String,
        default:"income"
    },
    description:{
        type:String,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:String,
    }
},{timestamps:true,versionKey:false})


const Income = mongoose.model('Income',incomeSchema);

module.exports = Income