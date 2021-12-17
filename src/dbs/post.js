/**
* Module for managing the dbs for post
* @module dbs/post
*/
'use strict'

const libs_dbs = require('@src/libs/dbs')
const _ = require('lodash')
const constants = require('@src/libs/constants')

module.exports = {
  /**
  * Call mongodb for getting a post by id
  * @param {String} _id The id to search
  * @return {Post} The post found or null
  **/
  get_post_by_id: _id => {
    try {
      return libs_dbs
        .get_low_db()
        .get('posts')
        .find({ _id })
        .value()
    } catch (err) {
      console.log(err)
    }
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
    try {
      let rsl = libs_dbs
        .get_low_db()
        .get('posts')

      rsl = rsl.value()

      if (joint === constants.joint_and) {
        if (title) {
          rsl = rsl.filter(post => title.test(post.title))
        }

        if (content) {
          rsl = rsl.filter(post => content.test(post.content))
        }
      } else if (joint === constants.joint_or) {
        rsl = rsl.filter(post => content.test(post.content) || title.test(post.title))
      }

      if (order) {
        rsl = _.orderBy(rsl, [sort || '_id'], [order])
      }

      if (limit || skip) {
        const max_limit = limit || 10000
        rsl = rsl.slice(skip, max_limit + skip)
      }

      return rsl
    } catch (err) {
      console.log(err)
    }
  },
  /**
  * Call mongodb for adding a post to the database
  * @param {string} _id The id of the post
  * @param {string} title The title of the post
  * @param {string} content The content of the post
  * @return {Post} The post added with the id
  **/
  insert: ({ _id, title, content }) => {
    try {
      libs_dbs.get_low_db().get('posts')
        .push({ _id, title, content })
        .write()
      return {
        _id,
        title,
        content
      }
    } catch (err) {
      console.log(err)
    }
  },
  /**
  * Update a post in mongodb respecting the condtion
  * @param {String} _id The id of the post to update
  * @param {Object} update The update to apply
  * @return {Post} The post updated or null
  **/
  update_by_id: (_id, update) => {
    try {
      return libs_dbs.get_low_db().get('posts')
        .find({ _id })
        .assign(update)
        .write()
    } catch (err) {
      console.log(err)
    }
  },
  /**
  * Delete a post in mongodb by id
  * @param {String} _id The id of the post to delete
  * @return {Post} The post deleted or null
  **/
  delete_by_id: (_id) => {
    try {
      return libs_dbs.get_low_db().get('posts')
        .remove({ _id })
        .write()
    } catch (err) {
      console.log(err)
    }
  },
  /**
  * Call mongodb for testing the existence of a post by id
  * @param {String} _id The id to search
  * @return {boolean} True if a document exist or else False
  **/
  test_post_by_id: _id => {
    let rsl = libs_dbs
      .get_low_db()
      .get('posts')
      .find({ _id: _id.toString() })
      .value()

    // I dont understand why but there seems to be a problem with the object
    if (!rsl) {
      rsl = libs_dbs
        .get_low_db()
        .get('posts')
        .find({ _id })
        .value()
    }

    return !!rsl
  }
}
