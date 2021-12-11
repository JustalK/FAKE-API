/**
* The utils function for managing the post
* @module utils/post
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const { DocumentNotFound } = require('@src/services/errors/documentNotFound')

/**
* Manage the mutations for the post model
**/
module.exports = {
  /**
  * Get a post by id
  * @param {String} id The id of the post to search
  * @return {Post} The post found or null
  * @throws Will throw an error if post with the id searched does not exist
  **/
  get_post_by_id: async id => {
    const post = await dbs.get_post_by_id(id)
    if (!post) {
      throw new DocumentNotFound(`The post(${id}) does not exist.`)
    }

    return post
  },
  /**
  * Add a post
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  add_post_by_args: async ({ title, content }) => {
    return await dbs.insert({ title, content })
  }
}
