const expense = require('../models/Expense')
const User = require('../models/User')
const Category = require('../models/Category')
const mongoose = require('mongoose')

exports.createExpense = async (req, res) => {
  const { title, amount, date, category } = req.body
  const userId = req.userId

  try {
    const newExpense = new expense({
      title,
      amount,
      date,
      category,
      user: userId
    })

    await newExpense.save()
    res.status(201).json(newExpense)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.getExpenses = async (req, res) => {
  const userId = req.userId

  try {
    const expenses = await expense.find({ user: userId }).populate('category')
    res.status(200).json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.getExpenseById = async (req, res) => {
  const { id } = req.params
  const userId = req.userId

  try {
    const expenseItem = await expense
      .findOne({ _id: id, user: userId })
      .populate('category')
    if (!expenseItem) {
      return res.status(404).json({ message: 'Expense not found' })
    }
    res.status(200).json(expenseItem)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.updateExpense = async (req, res) => {
  const { id } = req.params
  const userId = req.userId
  const { title, amount, date, category } = req.body

  try {
    const updatedExpense = await expense.findOneAndUpdate(
      { _id: id, user: userId },
      { title, amount, date, category },
      { new: true }
    )

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    res.status(200).json(updatedExpense)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.deleteExpense = async (req, res) => {
  const { id } = req.params
  const userId = req.userId

  try {
    const deletedExpense = await expense.findOneAndDelete({
      _id: id,
      user: userId
    })

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    res.status(200).json({ message: 'Expense deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.getExpenseByCategory = async (req, res) => {
  const { categoryId } = req.params
  const userId = req.userId

  try {
    const expenses = await expense
      .find({ user: userId, category: categoryId })
      .populate('category')
    if (!expenses) {
      return res
        .status(404)
        .json({ message: 'No expenses found for this category' })
    }
    res.status(200).json(expenses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
