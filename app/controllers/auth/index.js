const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { loginByAdmin } = require('./loginByAdmin')
const { register } = require('./register')
const { resetPassword } = require('./resetPassword')
const { roleAuthorization } = require('./roleAuthorization')
const { verify } = require('./verify')

module.exports = {
  forgotPassword,
  getRefreshToken,
  login,
  loginByAdmin,
  register,
  resetPassword,
  roleAuthorization,
  verify
}
