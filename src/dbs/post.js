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
  * @return {Object} The post found or null
  **/
  get_post_by_id: id => {
    return model.findOne({ _id: id })
  }
}
