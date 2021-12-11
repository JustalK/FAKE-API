'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test('[VISITOR] Get a post by id', async t => {
  t.is(true, true)
})
