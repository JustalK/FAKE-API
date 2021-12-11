const { ApolloError } = require('apollo-server-errors')

class DocumentNotFound extends ApolloError {
  constructor (message) {
    super(message, 'MY_ERROR_CODE')
    this.extensions = { code: 'MY_ERROR_CODE' }
    Object.defineProperty(this, 'name', { value: 'MyError' })
  }
}

module.exports = { DocumentNotFound }
