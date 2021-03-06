/**
* The utils function for managing the post
* @module utils/post
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const utils_filter = require('@src/services/utils/filter')
const Post = require('@src/models/' + filename)

/**
* Manage the mutations for the post model
**/
module.exports = {
  /**
  * Get a post by id
  * @param {String} id The id of the post to search
  * @return {Post} The post found or null
  **/
  get_post_by_id: async id => {
    return dbs.get_post_by_id(id)
  },
  /**
  * Return multiple posts passing the filters
  * @param {Int} limit Limit the number of result returned
  * @param {Int} skip Skip a certain amount of result
  * @param {String} sort Sort the result by field name
  * @param {String} order Order the result ASC or DESC
  * @param {String} joint Either join by `and` or `or`
  * @param {RegExp} title  Limit the result to a certain pattern of title
  * @param {RegExp} content Limit the result to a certain pattern of content
  * @return {[Post]} The posts restricted by the filters
  **/
  get_all_posts: async (args) => {
    const limit = utils_filter.handle_limit_argument(args.limit)
    const sort = utils_filter.handle_sort_argument(args.sort, Post)
    const skip = utils_filter.handle_skip_argument(args.skip)
    const order = utils_filter.handle_order_argument(args.order)
    const joint = utils_filter.handle_joint_argument(args.joint)
    const title = utils_filter.handle_regex_argument(args.title)
    const content = utils_filter.handle_regex_argument(args.content)
    return dbs.get_posts({ limit, skip, sort, order, joint, title, content })
  },
  /**
  * Add a post
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  add_post_by_args: async ({ title, content }) => {
    const tmp_post = new Post({ title, content })
    return await dbs.insert(tmp_post)
  },
  /**
  * Update a post
  * @param {string} id The id of the post to update
  * @param {Object} update The data to update
  * @return {Post} The post updated
  **/
  update_post_by_id: async (id, update) => {
    return await dbs.update_by_id(id, update)
  },
  /**
  * Delete a post
  * @param {string} id The id of the post to delete
  * @return {Post} The post deleted
  **/
  delete_post_by_id: async (id) => {
    return await dbs.delete_by_id(id)
  },
  /**
  * Test the post if a post exist in the db with this id
  * @param {String} id The id to test
  * @return {boolean} True if the post exist or else False
  **/
  is_post_exist_by_id: async id => {
    return dbs.test_post_by_id(id)
  }
}
