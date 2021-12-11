'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  Queries of the app
  """
  type Query  {
    """
    Return the post in the system
    """
    get_post_by_id(
      "The id of the post"
      post_id: String!): Post!
  }
`
