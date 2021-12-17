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
  * Mutation for adding a post
  * @param {Post} Return the post added
  **/
  add_post_by_args: async (_, args) => {
    return utils_post.add_post_by_args(args)
  },
  /**
  * Mutation for updating a post by id
  * @param {Post} Return the post edited
  **/
  update_post_by_id: async (_, args) => {
    const _id = args.post_id
    const update = args
    delete update.post_id

    return utils_post.update_post_by_id(_id, update)
  },
  /**
  * Mutation for deleting a post
  * @param {Post} Return the post deleted
  **/
  delete_post_by_id: async (_, args) => {
    const rsl = await utils_post.delete_post_by_id(args.post_id)
    return rsl !== null
  }
}
