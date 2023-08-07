const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
  check('name')
    .exists()
    .withMessage('NAME MISSING')
    .not()
    .isEmpty()
    .withMessage('please fill name')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('name invalid format'),
    
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),

  check('password')
    .exists()
    .withMessage('PASSWORD MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .matches(/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$)+/)
    .withMessage('Password must be a minimum 8 characters & Maximum 16 characters.At least one lowercase,At least one uppercase,At least one digit and At least it should have 8 characters long.Eg: Abcd1234')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateRegister }
