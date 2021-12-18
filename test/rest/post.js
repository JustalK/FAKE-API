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
    return m_utils.get_rest(url + queries)
  },
  /**
  * Make a rest request query to the API for getting muliple posts restricted by the filters
  * @return {[Post]} The posts searched or empty array
  **/
  add_post_by_args: async (url, { title, content }) => {
    return m_utils.post_rest(url, { title, content })
  }
}
