'use strict'

require('module-alias/register')
const fs = require('fs')
const utils = require('@src/libs/utils')
const mode = utils.mode(process.env.NODE_ENV)
require('dotenv').config({ path: './env/.env.' + mode })
const libs_dbs = require('@src/libs/dbs')
const datas = require('./test/post/posts')

module.exports = {
  /**
  * Remove the file managing the database
  **/
  clean: () => {
    try {
      fs.unlinkSync('db.json')
    } catch (err) {
      console.error(err)
    }
  },
  /**
  * Seed the database with the informations in data
  **/
  seed: () => {
    libs_dbs.get_low_db().defaults({ posts: datas }).write()
  }
}
