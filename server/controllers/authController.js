const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

const generateToken = user => {
  return jwt.sign(
    {
      id: user._id
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
}
exports.register = async (req, res) => {
  const { username, password, email } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    const user = new User({
      username,
      password,
      email
    })
    await user.save()
    const token = generateToken(user)
    res.cookie('token', token, { httpOnly: true }).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = generateToken(user)
    res.cookie('token', token, { httpOnly: true }).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.cookie('token', token, { httpOnly: true }).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.logout = async (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' })
}
