const { BadRequestError, NotFoundError } = require('../errors')
const ToPay = require('../models/toPay')

const addPay = async (req,res) =>{
    req.body.user = req.user.id
    const toPay = await ToPay.create(req.body)
    if (!toPay) {
        throw new BadRequestError("can't add")
    }
    res.status(200).json(toPay)
}

const removePay = async (req,res) =>{
    const {id} = req.params
    const removed = await ToPay.findOneAndDelete({_id:id,user:req.user.id})
    res.status(200).json(removed)
}

const getPay = async(req,res)=>{
    const pays = await ToPay.find({user:req.user.id});
    if(!pays){
        throw new NotFoundError("pays not found")
    }
    res.status(200).json(pays)
}

module.exports = {addPay, removePay, getPay}