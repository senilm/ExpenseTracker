const express = require('express');
const {addIncome, getIncome,deleteIncome} = require('../controllers/income')
const router = express.Router();


router.route('/addIncome').post(addIncome)
router.route('/getIncome').get(getIncome)
router.route('/deleteIncome/:id').delete(deleteIncome)



module.exports = router