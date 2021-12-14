/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()
const utils_post = require('@src/services/utils/post')
const utils_filter = require('@src/services/utils/filter')
const filename = path.basename(__filename, '.js')
const Post = require('@src/models/' + filename)

// Add an endpoint for testing the API
router.get('/', async (request, response) => {
  const limit = utils_filter.handle_limit_argument(request.limit)
  const sort = utils_filter.handle_sort_argument(request.sort, Post)
  const skip = utils_filter.handle_skip_argument(request.skip)
  const order = utils_filter.handle_order_argument(request.order)
  const joint = utils_filter.handle_joint_argument(request.joint)
  const title = utils_filter.handle_match_argument(request.title)
  const content = utils_filter.handle_match_argument(request.content)
  const posts = await utils_post.get_all_posts({ limit, skip, sort, order, title, content, joint })
  response.send(posts)
})

module.exports = router
