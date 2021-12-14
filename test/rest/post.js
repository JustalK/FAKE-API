'use strict'

require('module-alias/register')
const m_utils = require('@test/libs/utils')

module.exports = {
  /**
  * Make a rest request query to the API for getting muliple posts restricted by the filters
  * @return {[Post]} The posts searched or empty array
  **/
  get_posts: async () => {
    return m_utils.get_rest('/post')
  }
}
