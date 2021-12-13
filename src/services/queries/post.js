/**
* The queries for the posts
* @module queries/post
*/
'use strict'

const path = require('path')
const utils_post = require('@src/services/utils/post')
const utils_filter = require('@src/services/utils/filter')
const filename = path.basename(__filename, '.js')
const Post = require('@src/models/' + filename)
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
    const limit = utils_filter.handle_limit_argument(args.limit)
    const sort = utils_filter.handle_sort_argument(args.sort, Post)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)
    const title = utils_filter.handle_match_argument(args.title)
    const content = utils_filter.handle_match_argument(args.content)
    return utils_post.get_all_posts({ limit, skip, sort, order, title, content, joint })
  }
}
