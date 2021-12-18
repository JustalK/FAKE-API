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
* components:
*   schemas:
*     Post:
*       type: object
*       properties:
*         _id:
*           type: string
*           format: uuid
*           description: The _id of the post.
*           example: 5fd5b58efbc2f7a33c2aa001
*         title:
*           type: string
*           description: The title of the post.
*           example: Title of the post
*         content:
*           type: string
*           description: The content of the post.
*           example: Content of the post
*         deleted:
*           type: boolean
*           description: True if the post is deleted or else false
*           example: false
*/

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
 *     - name: "skip"
 *       type: "int"
 *       in: "query"
 *       description: "Skip a number of result"
 *     - name: "sort"
 *       type: "string"
 *       in: "query"
 *       description: "Sort the result by  key"
 *     - name: "order"
 *       type: "string"
 *       in: "query"
 *       description: "Order the result `ASC` or `DESC`"
 *     - name: "joint"
 *       type: "string"
 *       in: "query"
 *       description: "Either join by `and` or `or`"
 *     - name: "title"
 *       type: "string"
 *       in: "query"
 *       description: "Limit the result to a certain pattern of title"
 *     - name: "content"
 *       type: "string"
 *       in: "query"
 *       description: "Limit the result to a certain pattern of content"
 *     responses:
 *       200:
 *         description: Returns the status of the api
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('/', cors(), async (request, response) => {
  const posts = await utils_post.get_all_posts(request.query)
  response.send(posts)
})

module.exports = router
