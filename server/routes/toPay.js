const express = require('express');

const {addPay, removePay,getPay} = require('../controllers/toPay')

const router = express.Router();


router.route('/').post(addPay).get(getPay)
router.route('/:id').delete(removePay)

module.exports = router