const jwt = require('jsonwebtoken')

const token = jwt.sign(
  { userId: process.env.USER_ID },
  process.env.JWT_SECRET,
  { expiresIn: '5h' }
)

module.exports = token
