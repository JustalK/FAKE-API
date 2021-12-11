/**
* The mutations for the posts
* @module mutations/post
*/
'use strict'

const utils_post = require('@src/services/utils/post')
/**
* Manage the mutations for the post model
**/
module.exports = {
  /**
  * Query for adding a post
  * @param {Post} Return the post added
  **/
  add_post_by_args: async (_, args) => {
    return utils_post.add_post_by_args(args)
  }
}
