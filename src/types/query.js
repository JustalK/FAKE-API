'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar ID
  scalar Regex

  """
  Queries of the app
  """
  type Query  {
    """
    Return the post by id
    """
    get_post_by_id(
      "The id of the post"
      post_id: ID!): Post! @isPostExist

    """
    Return all the posts
    """
    get_posts(
      "Limit the result"
      limit: Int,
      "Skip an certain number of result"
      skip: Int,
      "Sort the result with a key"
      sort: String,
      "Order the result 'asc' or 'desc'"
      order: String,
      "Define the joint for multiple matching parameter 'and' or 'or'"
      joint: String,
      "Regex matching the title"
      title: Regex,
      "Regex matching the content"
      content: Regex,
      "True for getting only deleted post, false for not deleted post"
      deleted: Boolean,
      "Match an array of ID"
      posts_id: [String]): [Post]!
  }
`
