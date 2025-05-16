const router = require('express').Router()
const auth = require('../middleware/auth')
const { getExpenses, addExpense } = require('../controllers/expenseController')

router.use(auth)
router.get('/', getExpenses)
router.post('/', addExpense)
module.exports = router
