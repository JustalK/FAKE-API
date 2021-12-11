'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const queries_post = require('@test/queries/post')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

test.before(async () => {
  await m.start()
  await m_seeding.seed()
})

test('[VISITOR] Get a post by id', async t => {
  const response = await queries_post.get_post_by_id({ post_id: '5fd5b58efbc2f7a33c2aa001' })
  t.is(response.get_post_by_id.title, 'The only post not randomly created')
  t.is(response.get_post_by_id.content, 'The content of the only post not created randomly.')
  t.is(response.get_post_by_id.deleted, false)
})
