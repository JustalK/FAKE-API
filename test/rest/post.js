'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  /**
  * Make a rest request query to the API for getting muliple posts restricted by the filters
  * @return {[Post]} The posts searched or empty array
  **/
  get_posts: async (url, { limit, sort, skip, order, joint, title, content }) => {
    const params = []
    limit && params.push(`limit=${limit}`)
    skip && params.push(`skip=${skip}`)
    sort && params.push(`sort=${sort}`)
    order && params.push(`order=${order}`)
    joint && params.push(`joint=${joint}`)
    title && params.push(`title=${title}`)
    content && params.push(`content=${content}`)

    const queries = params.length > 0 ? `?${params.join('&')}` : ''
    return m_utils.call_rest(url + queries, 'GET')
  },
  /**
  * Create a post from the argument
  * @param {String} title The title of the post
  * @param {String} content The content of the post
  * @return {Post} The post created
  **/
  add_post_by_args: async (url, { title, content }) => {
    return m_utils.call_rest(url, 'POST', { title, content })
  },
  /**
  * Update a post
  * @param {String} post_id The id of the post to update
  * @param {String} title The new title of the post
  * @param {String} content The new content of the post
  * @param {Boolean} deleted The new status of the post
  * @return {Post} The post updated
  **/
  update_post_by_id: async (url, post_id, { title, content, deleted }) => {
    return m_utils.call_rest(`${url}/${post_id}`, 'PATCH', { title, content, deleted })
  },
  /**
  * Delete a post
  * @param {String} post_id The id of the post to delete
  * @return {Post} The post deleted
  **/
  delete_post_by_id: async (url, post_id) => {
    return m_utils.call_rest(`${url}/${post_id}`, 'DELETE')
  }
}
