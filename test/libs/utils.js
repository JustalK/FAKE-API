'use strict'

module.exports = {
  /**
  * Return the result of a graphql query
  * @param {Object} query The graphql query
  * @return {Object} The result of the query
  **/
  call_graphql: async (query) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    const response = await fetch(process.env.PROTOCOL + '://' + process.env.HOST + ':' + process.env.PORT + process.env.ENDPOINT, options)
    const response_json = await response.json()
    return response_json.errors !== undefined ? response_json : response_json.data
  },
  /**
  * Return the result of a get on rest api
  * @param {String} url The url endpoint
  * @param {String} method The method of the call
  * @param {String} params The params endpoint
  * @return {Object} The result of the query
  **/
  call_rest: async (url, method, params) => {
    const options = {
      method: method,
      headers: { 'Content-Type': 'application/json' }
    }

    if (params) {
      options.body = JSON.stringify(params)
    }

    const response = await fetch(process.env.PROTOCOL + '://' + process.env.HOST + ':' + process.env.PORT + url, options)
    return response.json()
  }
}
