const  Expense = require( "../models/expense")
const { BadRequestError,NotFoundError,UnauthenticatedError } = require("../errors")

const getExpenses = async(req,res)=>{
    const expenses = await Expense.find({});
    if(!expenses){
        throw new NotFoundError("Expenses not found")
    }
    res.status(200).json(expenses)
}

const addExpenses = async(req,res)=>{
    req.body.user = req.user.id
    const expense = await Expense.create(req.body)
    res.status(200).json(expense)
}

const editExpense = async(req,res)=>{
    const {amount, category, description} = req.body
    if(!amount || !category || !description){
        throw new BadRequestError("Please complete all the fields")
    }
    const {id} = req.params;

    const expense = await Expense.findOneAndUpdate({_id:id,user:req.user.id},req.body,{new:true})
    if(!expense){
        throw new NotFoundError("No such expense found")
    }
    res.status(200).json(expense)
}

const deleteExpense = async(req,res)=>{
    const {id} = req.params;
    const expense = await Expense.findOneAndDelete({_id:id,user:req.user.id})
    if(!expense){
        throw new NotFoundError("No such expense found")
    }
    res.status(200).json(expense)
}

const getOneExpense = async(req,res)=>{
    const {id} = req.params;
    const expense = await Expense.find({_id:id})
    if(!expense){
        throw new NotFoundError("No such expense found")
    }
    res.status(200).json(expense)
}


module.exports = {
    getExpenses,
    addExpenses,
    editExpense,
    deleteExpense,
    getOneExpense
}