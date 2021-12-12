/**
* The directives of the post
* @module directives/post
*/

const { SchemaDirectiveVisitor } = require('apollo-server-express')
const utils_post = require('@src/services/utils/post')

/**
* Create a directive for managing the existence of the post
**/
class isPostExist extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve } = field
    field.resolve = async function (...args) {
      const params = args[1]
      console.log(params)
      /**
      const post = await dbs.get_post_by_id(id)
      if (!post) {
        throw new DocumentNotFound(id)
      }
      **/
      return await resolve.apply(this, args)
    }
  }
}

module.exports = { isPostExist }
