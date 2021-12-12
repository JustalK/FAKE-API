'use strict'

const { gql } = require('apollo-server-express')

module.exports = gql`
  directive @isPostExist on FIELD_DEFINITION
`
