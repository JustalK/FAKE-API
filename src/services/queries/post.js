/**
* The queries for the posts
* @module queries/post
*/
'use strict'

const utils_post = require('@src/services/utils/post')
/**
* Manage the queries for the company model
**/
module.exports = {
  /**
  * Query for getting a post from an id
  * @param {Post} Return the post
  **/
  get_post_by_id: async (_, args) => {
    return utils_post.get_post_by_id(args.post_id)
  }
}
