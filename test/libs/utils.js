'use strict'

module.exports = {
  /**
  * Return the result of a graphql query
  * @params {Object} query The graphql query
  * @return {Object} The result of the query
  **/
  getter: async (query) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    const response = await fetch('http://' + process.env.HOST + ':' + process.env.PORT + process.env.ENDPOINT, options)
    const response_json = await response.json()
    return response_json.errors !== undefined ? response_json : response_json.data
  }
}
