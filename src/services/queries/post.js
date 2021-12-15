/**
* The queries for the posts
* @module queries/post
*/
'use strict'

const utils_post = require('@src/services/utils/post')
/**
* Manage the queries for the post model
**/
module.exports = {
  /**
  * Query for getting a post from an id
  * @param {Post} Return the post
  **/
  get_post_by_id: async (_, args) => {
    return utils_post.get_post_by_id(args.post_id)
  },
  /**
  * Query for getting multiple posts
  * @param {[Post]} Return the posts passing the filters
  **/
  get_posts: async (_, args) => {
    return utils_post.get_all_posts(args)
  }
}
