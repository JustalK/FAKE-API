'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  /**
  * Make a graphql query to the API for getting a post by ID
  * @param {string} post_id The id of the post searched
  * @return {Post} The post searched or null
  **/
  get_post_by_id: async ({ post_id }) => {
    return m_utils.getter({
      query: `
        query {
          get_post_by_id(post_id: "${post_id}") {
            title
            content
            deleted
          }
        }`
    })
  },
  /**
  * Make a graphql query to the API for getting muliple posts restricted by the filters
  * @param {Int} limit Limit the number of result returned
  * @param {Int} skip Skip a certain amount of result
  * @param {String} sort Sort the result by field name
  * @param {String} order Order the result ASC or DESC
  * @param {String} joint Either join by `and` or `or`
  * @param {RegExp} title  Limit the result to a certain pattern of title
  * @param {RegExp} content Limit the result to a certain pattern of content
  * @return {[Post]} The posts searched or empty array
  **/
  get_posts: async ({ limit = null, sort = null, order = null, joint = null, title = null, content = null }, token) => {
    const params = []
    limit && params.push(`limit: ${limit}`)
    sort && params.push(`sort: "${sort}"`)
    order && params.push(`order: "${order}"`)
    joint && params.push(`joint: "${joint}"`)
    title && params.push(`username: "${title}"`)
    content && params.push(`email: "${content}"`)
    return m_utils.getter({
      query: `
        query {
          get_posts${params.length > 0 ? '(' + params.join() + ')' : ''} {
            title
            content
            deleted
          }
        }`
    }, token)
  },
  /**
  * Make a graphql mutation to the API for adding a post
  * @param {String} title The title of the post
  * @param {String} content The content of the post
  * @return {Post} The post created
  **/
  add_post_by_args: async ({ title, content }) => {
    const params = []
    title && params.push(`title: "${title}"`)
    content && params.push(`content: "${content}"`)

    return m_utils.getter({
      query: `
        mutation {
          add_post_by_args(${params.join()}) {
              title
              content
              deleted
          }
        }`
    })
  },
  /**
  * Make a graphql mutation to the API for adding a post without checking type
  * @param {Object} title The title of the post
  * @param {String} content The content of the post
  * @return {Post} The post created
  **/
  error_add_post_by_args: async ({ title, content }) => {
    const params = []
    title && params.push(`title: ${title}`)
    content && params.push(`content: "${content}"`)

    return m_utils.getter({
      query: `
        mutation {
          add_post_by_args(${params.join()}) {
              title
              content
              deleted
          }
        }`
    })
  }
}
