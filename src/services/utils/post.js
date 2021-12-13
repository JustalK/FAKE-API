/**
* The utils function for managing the post
* @module utils/post
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)

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
  * Add a post
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  add_post_by_args: async ({ title, content }) => {
    return await dbs.insert({ title, content })
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
