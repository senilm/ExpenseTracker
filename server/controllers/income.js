const { BadRequestError } = require('../errors');
const Income = require('../models/income')



const addIncome = async (req,res) =>{
    req.body.user = req.user.id
    const {amount} = req.body;
    if(amount <= 0 || !amount === 'number'){
        throw new BadRequestError("Amount should be more than zero")
    }
    const income = await Income.create(req.body)
    res.status(200).json(income)
}
const getIncome = async (req,res) =>{
    
    const income = await Income.find({user:req.user.id})
    res.status(200).json(income)
}
const deleteIncome = async (req,res) =>{
    
    const income = await Income.findOneAndDelete({_id:req.params.id})
    if(!income){
        throw new BadRequestError('No Income found') 
    }
    res.status(200).json(income)
}

module.exports = {addIncome, getIncome, deleteIncome} 