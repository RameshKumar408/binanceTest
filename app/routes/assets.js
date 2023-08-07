const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')
const { 
  createAsset,
  updateAsset,
  getAllAssets,
  getAssets,
  getAsset,
  getAssetBySymbol
} = require('../controllers/assets')
const { 
  validateCreateAsset,
  validateUpdateAsset ,
  validateGetAsset,
  validateAssetSymbol
} = require('../controllers/assets/validators')

const { roleAuthorization } = require('../controllers/auth')
/*
 * Assets routes
 */

/*
 * Get all items route
 */
router.get('/getall', getAllAssets)
/*
 * Get items route
 */
router.get(
  '/list',
  requireAuth,
  trimRequest.all,
  getAssets
)
/*
 * Get item route
 */
router.get(
  '/asset-info/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetAsset,
  getAsset
)
router.get(
  '/assetDetail/:asset',
  trimRequest.all,
  validateAssetSymbol,
  getAssetBySymbol
)
/*
 * Create new item route
 */
router.post(
    '/create',
    requireAuth,
    roleAuthorization(['admin']),
    trimRequest.all,
    validateCreateAsset,
    createAsset
  )
/*
 * Update item route
 */
router.patch(
  '/update/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateAsset,
  updateAsset
)
  module.exports = router