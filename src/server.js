/**
* The module for managing everything relative to the server
* @module server
*/
'use strict'

const express = require('express')
const voyagerMiddleware = require('graphql-voyager/middleware')
const apollo = require('@src/apollo')
const logger = require('@src/libs/logger')
const crontab = require('@src/crontab/crontab')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')

module.exports = {
  /**
  * Create the restify server
  * @return {Express} A server restify without any routes
  **/
  create_server: () => {
    return express()
  },
  /**
  * Allow us to use Graph QL with fastify
  * @param {Express} server The server allowed to use graphQl
  **/
  register_graphql: (server) => {
    const apollo_server = apollo.get_handler()
    apollo_server.applyMiddleware({ app: server, path: process.env.ENDPOINT })
  },
  /**
  * Allow us to use the middleware voyager
  * @param {Express} server The server allowed to use the middleware voyager
  **/
  register_voyager: (server) => {
    server.use(process.env.ENDPOINT_ERD, voyagerMiddleware.express({ endpointUrl: process.env.ENDPOINT }))
  },
  /**
  * Allow us to use the middleware express status monitor
  * @param {Express} server The server allowed to use the monitor
  **/
  register_monitor: (server) => {
    server.use(require('express-status-monitor')())
  },
  /**
  * Allow us to use the middleware for the documentation with swagger
  * @param {Express} server The server allowed to use the swagger endpoint
  **/
  register_swagger: (server) => {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Test-API',
          version: '1.0.0'
        },
        servers: [{
          url: process.env.HEROKU_PROTOCOL + '://' + process.env.HEROKU_HOST
        }]
      },
      apis: ['src/routes/*.js']
    }

    const openapiSpecification = swaggerJsdoc(options)

    server.use('/api/rest', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
  },
  /**
  * Allow us to use the middleware helmet for hidding some headers
  * @param {Express} server The server allowed to use helmet
  **/
  register_helmet: (server) => {
    server.use(require('helmet')())
  },
  /**
  * Allow us to use the cors middleware
  * @param {Express} server The server allowed to use helmet
  **/
  register_cors: (server) => {
    server.options('*', cors())
  },
  /**
  * Start the server using the parameter
  * @param {string} name The name of the server
  * @param {string} host The host of the server
  * @param {string} port The port of the server
  * @return {Promise<boolean>} True if the server start or else an error
  **/
  start: async (name, host, port) => {
    const server = module.exports.create_server()
    crontab.start()

    module.exports.register_cors(server)
    module.exports.register_swagger(server)
    module.exports.register_graphql(server)
    module.exports.register_voyager(server)
    module.exports.register_monitor(server)
    module.exports.register_helmet(server)

    server.use('/', require('./routes/app'))
    server.use('/post', require('./routes/post'))

    return new Promise((resolve, reject) => {
      server.listen({ port: port, host: host }, (error) => module.exports.callback(error, resolve, reject))
    })
  },
  /**
  * Handle the callback of the server listening
  * @param {Error} error The object error returned by the listen function
  **/
  callback: (error, resolve, reject) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject(new Error('Server fail to start !'))
    }
    logger.info('Server Started')
    logger.log('Logger Activated')
    resolve(true)
  }
}
