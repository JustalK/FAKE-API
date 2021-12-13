const { GraphQLScalarType, Kind } = require('graphql')
const RegexParser = require('regex-parser')

const Regex = new GraphQLScalarType({
  name: 'Regex',
  description: 'Mongoose Regex Scalar',
  serialize (value) {
    return value.toString()
  },
  parseValue (value) {
    return RegexParser(value)
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return RegexParser(ast.value)
      } catch (e) {
        return null
      }
    }
    return null
  }
})

module.exports = Regex
