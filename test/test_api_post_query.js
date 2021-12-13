'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const queries_post = require('@test/queries/post')
const constants = require('@src/libs/constants')

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

test('[VISITOR] Get all posts without filters', async t => {
  const response = await queries_post.get_posts({})
  // The random post + the static one
  t.is(response.get_posts.length, parseInt(process.env.SEEDING_NUMBER) + 1)
})

test('[VISITOR] Get all posts with limit to 1', async t => {
  const response = await queries_post.get_posts({ limit: 1 })
  t.is(response.get_posts.length, 1)
})

test('[VISITOR] Get all posts with limit to 12', async t => {
  const response = await queries_post.get_posts({ limit: 12 })
  t.is(response.get_posts.length, 12)
})

test('[VISITOR] Get all posts with skip', async t => {
  const response_full = await queries_post.get_posts({})
  const second_response = response_full.get_posts[1]
  const response_skipped = await queries_post.get_posts({ skip: 1 })
  t.is(response_skipped.get_posts[0].title, second_response.title)
  t.is(response_skipped.get_posts[0].content, second_response.content)
})

test('[VISITOR] Get all posts with skip and limit', async t => {
  const response_full = await queries_post.get_posts({ limit: 2 })
  const second_response = response_full.get_posts[1]
  t.is(response_full.get_posts.length, 2)
  const response_skipped = await queries_post.get_posts({ skip: 1, limit: 2 })
  t.is(response_skipped.get_posts[0].title, second_response.title)
  t.is(response_skipped.get_posts[0].content, second_response.content)
  t.is(response_skipped.get_posts.length, 2)
})

test('[VISITOR] Get all posts with order', async t => {
  const response_ascending = await queries_post.get_posts({ order: constants.order_ascending })
  const last_response_ascending = response_ascending.get_posts[response_ascending.get_posts.length - 1]
  const response_descending = await queries_post.get_posts({ order: constants.order_descending })
  t.is(response_descending.get_posts[0].title, last_response_ascending.title)
  t.is(response_descending.get_posts[0].content, last_response_ascending.content)
})

test('[VISITOR] Get all posts with filter on title', async t => {
  const response = await queries_post.get_posts({ title: /The only post/ })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR] Get bo posts with filter on title', async t => {
  const response = await queries_post.get_posts({ title: /zzZZZzzzzZZZ/ })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR] Get all posts with filter on content', async t => {
  const response = await queries_post.get_posts({ content: /content of/ })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR] Get no posts with filter on content', async t => {
  const response = await queries_post.get_posts({ content: /Idontexist/ })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR] Get no posts with filter on title and content with joint and', async t => {
  const response = await queries_post.get_posts({ title: /The only post/, content: /zzZZZzzzzZZZ/, joint: constants.joint_and })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR] Get all posts with filter on title and content with joint or', async t => {
  const response = await queries_post.get_posts({ title: /The only post/, content: /zzZZZzzzzZZZ/, joint: constants.joint_or })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})
