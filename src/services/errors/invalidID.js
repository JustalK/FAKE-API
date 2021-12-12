const { ApolloError } = require('apollo-server-errors')

/**
 * The InvalidID object which means a ID does not respect the 12 or 24hex of mongoose ID
 * @typedef {Object} InvalidID
 * @property {string} message The message of the error
 * @property {Object} extentions The informations relative to the error
 */

class InvalidID extends ApolloError {
  constructor (message) {
    super(`The id(${message}) is not a valid ID.`)
    this.extensions = {
      code: 'BAD_ID'
    }
  }
}

module.exports = { InvalidID }
