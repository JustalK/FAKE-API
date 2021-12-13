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

test('[VISITOR] Trying to get a post by id which does not exist', async t => {
  const response = await queries_post.get_post_by_id({ post_id: '5fd5b58efbc2f7a33c2aa000' })
  t.is(response.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa000) does not exist.')
  t.is(response.errors[0].extensions.code, 'NOT_FOUND')
})

test('[VISITOR] Trying to get a post by id with an invalid mongoose ID', async t => {
  const response = await queries_post.get_post_by_id({ post_id: '5fd5b58efbc2f7' })
  t.is(response.errors[0].message, 'Expected value of type "ID!", found "5fd5b58efbc2f7"; The id(5fd5b58efbc2f7) is not a valid ID.')
  t.is(response.errors[0].extensions.code, 'BAD_ID')
})

test('[VISITOR] Add a post by args', async t => {
  const response = await queries_post.add_post_by_args({ title: 'My test title', content: 'My test content' })
  t.is(response.add_post_by_args.title, 'My test title')
  t.is(response.add_post_by_args.content, 'My test content')
})

test('[VISITOR] Add a post by args with missing content arg', async t => {
  const response = await queries_post.add_post_by_args({ title: 'My test title' })
  t.is(response.errors[0].message, 'Field "add_post_by_args" argument "content" of type "String!" is required, but it was not provided.')
})

test('[VISITOR] Add a post by args with missing title arg', async t => {
  const response = await queries_post.add_post_by_args({ content: 'My test content' })
  t.is(response.errors[0].message, 'Field "add_post_by_args" argument "title" of type "String!" is required, but it was not provided.')
})

test('[VISITOR] Add a post by args with wrong title type', async t => {
  const response = await queries_post.error_add_post_by_args({ title: 12, content: 'My test content' })
  t.is(response.errors[0].message, 'String cannot represent a non string value: 12')
})
