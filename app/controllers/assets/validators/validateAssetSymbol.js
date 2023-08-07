const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates get item request
 */
const validateAssetSymbol = [
    check('asset')
    .exists()
    .withMessage('Asset MISSING')
    .not()
    .isEmpty()
    .withMessage('Asset IS_EMPTY')
    .isAlphanumeric()
    .withMessage('Asset invalid format')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateAssetSymbol }