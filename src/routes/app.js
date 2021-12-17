/**
* The endpoint of the express app
* @module routes/app
*/
'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const marked = require('marked')
const cors = require('cors')

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *     - "Utils"
 *     summary: "Testing the status of the api"
 *     description: "If this call work, it means the api is running properly"
 *     responses:
 *       200:
 *         description: Returns the status of the api
 */
router.get('/', cors(), async (request, response) => {
  response.send({
    status: 'working'
  })
})

/**
 * @swagger
 * /documentation:
 *   get:
 *     tags:
 *     - "Utils"
 *     summary: "Documentation endpoint for the developer"
 *     description: "Give an endpoint for showing the readme"
 *     responses:
 *       200:
 *         description: Returns the html code for the page
 */
router.get('/documentation', cors(), function (request, response) {
  const path = 'README.md'
  const file = fs.readFileSync(path, 'utf8')
  response.send(marked(file.toString()))
})

module.exports = router
