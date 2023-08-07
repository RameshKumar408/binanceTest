const Admin = require('../../../models/admin')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds admin by email
 * @param {string} email - admin´s email
 */
const findAdmin = (email = '') => {
  return new Promise((resolve, reject) => {
    Admin.findOne(
      {
        email
      },
      'password loginAttempts blockExpires name email role verified verification',
      async (err, item) => {
        try {
          await itemNotFound(err, item, 'ADMIN_DOES_NOT_EXIST')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      }
    )
  })
}

module.exports = { findAdmin }
