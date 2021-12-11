'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  Mutation of the app
  """
  type Mutation  {
    """
    Add a post on the server
    """
    add_post_by_args(
      "Title of a post"
      title: String!,
      "Content of a post"
      content: String!): Post!
  }
`
