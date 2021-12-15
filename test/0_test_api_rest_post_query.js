'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const queries_post = require('@test/rest/post')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test.only('[VISITOR][REST] Get all posts', async t => {
  const response = await queries_post.get_posts('/post', {})
  t.is(response.length, parseInt(process.env.SEEDING_NUMBER) + 1)
})

test.only('[VISITOR][REST] Get all posts with limit', async t => {
  const response = await queries_post.get_posts('/post', { limit: 1 })
  t.is(response.length, 1)
})
