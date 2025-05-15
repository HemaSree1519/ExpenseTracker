const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    req.userId = decoded.id
    next()
  })
}

module.exports = auth
