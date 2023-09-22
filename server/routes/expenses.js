const express = require('express');
const {
    getExpenses,
    addExpenses,
    editExpense,
    deleteExpense,
    getOneExpense
} = require('../controllers/expenses')

const router = express.Router();


router.route('/').get(getExpenses).post(addExpenses);
router.route('/:id').patch(editExpense).delete(deleteExpense).get(getOneExpense)


module.exports = router;