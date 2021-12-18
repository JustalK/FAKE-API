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
  * @return {Object} The result of the query
  **/
  get_rest: async (url) => {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }

    const response = await fetch(process.env.PROTOCOL + '://' + process.env.HOST + ':' + process.env.PORT + url, options)
    return response.json()
  }
}
