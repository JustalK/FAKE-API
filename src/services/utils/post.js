/**
* The utils function for managing the post
* @module utils/post
*/
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const { DocumentNotFound } = require('@src/services/errors/documentNotFound')
const { InvalidID } = require('@src/services/errors/invalidID')

/**
* Manage the mutations for the post model
**/
module.exports = {
  /**
  * Get a post by id
  * @param {String} id The id of the post to search
  * @return {Post} The post found or null
  * @throws {InvalidID} Will throw an error if the id is not a valid mongoose ID
  * @throws {DocumentNotFound} Will throw an error if post with the id searched does not exist
  **/
  get_post_by_id: async id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new InvalidID(id)
    }

    const post = await dbs.get_post_by_id(id)
    if (!post) {
      throw new DocumentNotFound(id)
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
