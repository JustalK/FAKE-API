const { ApolloError } = require('apollo-server-errors')

class DocumentNotFound extends ApolloError {
  constructor (message) {
    super(`The object with id(${message}) does not exist.`)
    this.extensions = {
      code: 'NOT_FOUND'
    }
  }
}

module.exports = { DocumentNotFound }
