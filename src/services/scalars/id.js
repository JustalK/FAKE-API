const { GraphQLScalarType, Kind } = require('graphql')
const mongoose = require('mongoose')
const { InvalidID } = require('@src/services/errors/invalidID')

const ID = new GraphQLScalarType({
  name: 'ID',
  description: 'Mongoose ID Scalar',
  serialize (value) {
    return value.toHexString()
  },
  parseValue (value) {
    return mongoose.Types.ObjectId(value)
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      if (!mongoose.Types.ObjectId.isValid(ast.value)) {
        throw new InvalidID(ast.value)
      }

      return mongoose.Types.ObjectId(ast.value)
    }
    return null
  }
})

module.exports = ID
