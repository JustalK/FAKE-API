const { ApolloError } = require('apollo-server-errors')

/**
 * The DocumentNotFound object which means a document has not been found
 * @typedef {Object} DocumentNotFound
 * @property {string} message The message of the error
 * @property {Object} extentions The informations relative to the error
 */

class DocumentNotFound extends ApolloError {
  constructor (message) {
    super(`The object with id(${message}) does not exist.`)
    this.extensions = {
      code: 'NOT_FOUND'
    }
  }
}

module.exports = { DocumentNotFound }
