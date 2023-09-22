const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:[true, "Please provide amount"]
    },
    description:{
        type:String,
    },
    category :{
        type:String,
        required:[true, "Please Choose Category amount"],
        enum:['food', 'groceries', 'transportation','rent', 'fees','health','entertainment','work', 'other']
    },
    type:{
        type:String,
        default:"expense"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})


const Expense = mongoose.model('Expense',expenseSchema)

module.exports = Expense