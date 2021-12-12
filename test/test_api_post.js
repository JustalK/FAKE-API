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

test('[VISITOR] Get a post by id which does not exist', async t => {
  const response = await queries_post.get_post_by_id({ post_id: '5fd5b58efbc2f7a33c2aa000' })
  t.is(response.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa000) does not exist.')
  t.is(response.errors[0].extensions.code, 'NOT_FOUND')
})

test('[VISITOR] Add a post by args', async t => {
  const response = await queries_post.add_post_by_args({ title: 'My test title', content: 'My test content' })
  t.is(response.add_post_by_args.title, 'My test title')
  t.is(response.add_post_by_args.content, 'My test content')
})
