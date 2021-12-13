'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  """
  Mutation of the app
  """
  type Mutation  {
    """
    Add a post
    """
    add_post_by_args(
      "Title of the post"
      title: String!,
      "Content of the post"
      content: String!): Post!

    """
    Update a post
    """
    update_post_by_id(
      "Id of the post to edit"
      post_id: ID!,
      "The title of the post"
      title: String,
      "The content of the post"
      content: String,
      "The status of the post"
      deleted: Boolean): Post! @isPostExist

    """
    Delete a post
    """
    delete_post_by_id(
      "Id of the post to delete"
      post_id: ID!): Boolean! @isPostExist
  }
`
