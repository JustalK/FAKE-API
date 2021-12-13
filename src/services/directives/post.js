/**
* The directives of the post
* @module directives/post
*/

const { SchemaDirectiveVisitor } = require('apollo-server-express')
const utils_post = require('@src/services/utils/post')
const { DocumentNotFound } = require('@src/services/errors/documentNotFound')

/**
* Create a directive for managing the existence of the post
**/
class isPostExist extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const params = args[1]
      const { post_id } = params
      const post = await utils_post.is_post_exist_by_id(post_id)
      if (!post) {
        throw new DocumentNotFound(post_id)
      }

      return await resolve.apply(this, args)
    }
  }
}

module.exports = { isPostExist }
