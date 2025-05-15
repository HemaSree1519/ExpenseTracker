const mongoose = require('mongoose')
const expenseSchema = new mongoose.mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Expense', expenseSchema)
