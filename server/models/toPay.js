const mongoose = require('mongoose');

const toPaySchema = new mongoose.Schema({
    Detail:{
        type:String,
        required:[true,"Please add Details" ]
    },
    amount:{
        type:Number,
        required:[true, 'please add amount']
    },
    user:{
        type:String
    }
})

const ToPay = mongoose.model('ToPay', toPaySchema);

module.exports = ToPay