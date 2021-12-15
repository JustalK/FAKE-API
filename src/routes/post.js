/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const utils_post = require('@src/services/utils/post')

// Add an endpoint for testing the API
router.get('/', async (request, response) => {
  const posts = await utils_post.get_all_posts(request.query)
  response.send(posts)
})

module.exports = router
