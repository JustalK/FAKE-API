/**
* Module for managing the dbs for post
* @module dbs/post
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
  * Call mongodb for getting a post by id
  * @param {String} id The id to search
  * @return {Post} The post found or null
  **/
  get_post_by_id: id => {
    return model.findOne({ _id: id })
  },
  /**
  * Call mongodb for adding a post to the database
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  insert: ({ title, content }) => {
    return model.create({ title, content })
  }
}
