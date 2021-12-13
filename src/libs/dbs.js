/**
* Set of global functions or constants about the dbs and mongoose
* @module libs/dbs
*/
'use strict'

const constants = require('@src/libs/constants')

module.exports = {
  /**
  * Get the date of yesterday
  **/
  handle_classic_filters: ({ matches, order, sort, limit, skip, joint }) => {
    const aggregation = []

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    // Limit the result
    aggregation.push({ $skip: skip })

    // Limit the result
    if (limit) {
      aggregation.push({ $limit: limit })
    }

    return aggregation
  }
}
