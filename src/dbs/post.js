/**
* Module for managing the dbs for post
* @module dbs/post
*/
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)
const libs_dbs = require('@src/libs/dbs')

module.exports = {
  /**
  * Call mongodb for getting a post by id
  * @param {String} _id The id to search
  * @return {Post} The post found or null
  **/
  get_post_by_id: _id => {
    return model.findOne({ _id })
  },
  /**
  * Call mongodb for getting all the document
  * @param {Int} limit Limit the number of result returned
  * @param {Int} skip Skip a certain amount of result
  * @param {String} sort Sort the result by field name
  * @param {String} order Order the result ASC or DESC
  * @param {String} joint Either join by `and` or `or`
  * @param {RegExp} title  Limit the result to a certain pattern of title
  * @param {RegExp} content Limit the result to a certain pattern of content
  * @return {[Post]} The posts restricted by the filters
  **/
  get_all_users: ({ limit, skip, sort, order, joint, title, content }) => {
    const matches = []

    if (title !== null) {
      matches.push({ title: { $regex: title } })
    }

    if (content !== null) {
      matches.push({ content: { $regex: title } })
    }

    const aggregation = libs_dbs.handle_classic_filters({ matches, skip, order, sort, limit, joint })
    return model.aggregate(aggregation)
  },
  /**
  * Call mongodb for adding a post to the database
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  insert: ({ title, content }) => {
    return model.create({ title, content })
  },
  /**
  * Call mongodb for testing the existence of a post by id
  * @param {String} _id The id to search
  * @return {boolean} True if a document exist or else False
  **/
  test_post_by_id: _id => {
    return model.exists({ _id })
  }
}
