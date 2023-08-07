const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateUpdateAsset = [
    check('id')
    .exists()
    .withMessage('ID_MISSING')
    .not()
    .isEmpty()
    .withMessage('ID_IS_EMPTY'),
  check('source')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isAlphanumeric()
    .withMessage('source invalid format')
    .trim(),

    check('coinname')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),

    check('chain')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isAlphanumeric()
    .withMessage('source invalid format')
    .trim(),

    check('chain')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['fiat','coin','erc20','bep20','trc20','trc10'])
    .withMessage('chain must be fiat | coin | erc20 | bep20 | trc20 | trc10')
    .trim(),
    
    check('withdraw', 'Please enter a numeric withdraw commission!')
    .optional()
    .isNumeric(),
    check('maxwithdraw', 'Please enter a numeric Max withdraw Limit!')
    .optional()
    .isNumeric(),
    check('minwithdraw', 'Please enter a numeric min withdraw Limit!')
    .optional()
    .isNumeric(),
    check('contractaddress', 'INVALID_FORMAT')
    .optional()
    .isString(),
    check('abiarray', 'INVALID_FORMAT')
    .optional()
    .isString(),
    check('point_value', 'Please enter a valid number!')
    .optional()
    .isInt(),
    check('netfee', 'Please enter a valid number!')
    .optional()
    .isNumeric(),
    check('orderlist', 'Please enter a valid number!')
    .optional()
    .isNumeric(),
    check('image', 'INVALID_FORMAT')
    .optional()
    .isString(),
    check('url', 'INVALID_FORMAT')
    .optional()
    .isString(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateAsset }
