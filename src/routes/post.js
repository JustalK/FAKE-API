/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const utils_post = require('@src/services/utils/post')
const cors = require('cors')
const mongoose = require('mongoose')

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

/**
 * @swagger
 * /post:
 *   post:
 *     tags:
 *     - "Posts"
 *     summary: "Create a post"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *                 example: My title
 *               content:
 *                 type: string
 *                 description: The content of the post
 *                 example: My content
 *     responses:
 *       200:
 *         description: Returns the status of the api
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.post('/', cors(), async (request, response) => {
  const post = await utils_post.add_post_by_args(request.body)
  response.send(post)
})

/**
 * @swagger
 * /post/:id:
 *   patch:
 *     tags:
 *     - "Posts"
 *     summary: "Update a post by ID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *                 example: My title
 *               content:
 *                 type: string
 *                 description: The content of the post
 *                 example: My content
 *               deleted:
 *                 type: boolean
 *                 description: True if the post is deleted or else false
 *                 example: false
 *     responses:
 *       200:
 *         description: Returns the status of the api
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
router.patch('/:id', cors(), async (request, response) => {
  const _id = request.params.id
  const update = request.body

  const post = await utils_post.update_post_by_id(_id, update)
  response.send(post)
})

router.delete('/:id', cors(), async (request, response) => {
  const id = mongoose.Types.ObjectId(request.params.id)
  const rsl = await utils_post.delete_post_by_id(id)
  response.send(rsl !== null)
})

module.exports = router
