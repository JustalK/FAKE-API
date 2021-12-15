/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const marked = require('marked')

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', async (request, response) => {
  response.send({
    status: 'working'
  })
})

// Add a documentation endpoint coming from the README
router.get('/documentation', function (request, response) {
  const path = 'README.md'
  const file = fs.readFileSync(path, 'utf8')
  response.send(marked(file.toString()))
})

module.exports = router
