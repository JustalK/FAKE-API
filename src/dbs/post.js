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
  get_posts: ({ limit, skip, sort, order, joint, title, content }) => {
    const matches = []

    if (title !== null) {
      matches.push({ title: { $regex: title } })
    }

    if (content !== null) {
      matches.push({ content: { $regex: content } })
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
    libs_dbs.get_low_db().get('posts')
      .push({ title, content })
      .write()
    return model.create({ title, content })
  },
  /**
  * Update a post in mongodb respecting the condtion
  * @param {String} _id The id of the post to update
  * @param {Object} update The update to apply
  * @return {Post} The post updated or null
  **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id }, update, { new: true })
  },
  /**
  * Delete a post in mongodb by id
  * @param {String} _id The id of the post to delete
  * @return {Post} The post deleted or null
  **/
  delete_by_id: (_id) => {
    return model.deleteOne({ _id })
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
