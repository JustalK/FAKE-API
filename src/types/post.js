'use strict'

const { gql } = require('apollo-server-express')

/**
 * The post object
 * @typedef {Object} Post
 * @property {string} name The title of the post
 * @property {string} content The title of the post
 * @property {boolean} deleted True if the post is deleted, or else false
 */

module.exports = gql`
  """
  The models for the post
  """
  type Post {
    """
    The id of a post
    """
    _id: ID!
    """
    The title of a post
    """
    title: String!
    """
    The content of a post
    """
    content: String!
    """
    True if the post is deleted or not
    """
    deleted: Boolean
  }
`
