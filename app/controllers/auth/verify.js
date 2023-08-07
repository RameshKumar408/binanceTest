const { matchedData } = require('express-validator')
const { verificationExists, verifyUser } = require('./helpers')

const { handleError } = require('../../middleware/utils')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await verificationExists(req.id)
    const result = await verifyUser(user)
    res.status(200).json({
      success : true,
      result:  result,
      message: null
    })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { verify }
