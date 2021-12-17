/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const utils_post = require('@src/services/utils/post')
const cors = require('cors')

/**
 * @swagger
 * /post:
 *   get:
 *     tags:
 *     - "Posts"
 *     summary: "Getting the posts"
 *     description: "The posts received are limited to the parameters chosen"
 *     parameters:
 *     - name: "limit"
 *       type: "int"
 *       in: "query"
 *       description: "Limit the number of result"
 *     responses:
 *       200:
 *         description: Returns the status of the api
 */
router.get('/', cors(), async (request, response) => {
  const posts = await utils_post.get_all_posts(request.query)
  response.send(posts)
})

module.exports = router
