'use strict'

require('dotenv').config({ path: './env/.env.test' })
require('isomorphic-fetch')
require('module-alias/register')
const queries_graphql = require('@test/graphql/post')
const queries_rest = require('@test/rest/post')
const constants = require('@src/libs/constants')

const test = require('ava')
const m = require('@src')
const m_seeding = require('@seeding/seeder')

test.before(async () => {
  await m.start()
  m_seeding.clean()
  m_seeding.seed()
})

test('[VISITOR][GRAPHQL] Get a post by id', async t => {
  const response = await queries_graphql.get_post_by_id({ post_id: '5fd5b58efbc2f7a33c2aa001' })
  t.is(response.get_post_by_id.title, 'The only post not randomly created')
  t.is(response.get_post_by_id.content, 'The content of the only post not created randomly.')
  t.is(response.get_post_by_id.deleted, false)
})

test('[VISITOR][GRAPHQL] Trying to get a post by id which does not exist', async t => {
  const response = await queries_graphql.get_post_by_id({ post_id: '5fd5b58efbc2f7a33c2aa000' })
  t.is(response.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa000) does not exist.')
  t.is(response.errors[0].extensions.code, 'NOT_FOUND')
})

test('[VISITOR][GRAPHQL] Trying to get a post by id with an invalid mongoose ID', async t => {
  const response = await queries_graphql.get_post_by_id({ post_id: '5fd5b58efbc2f7' })
  t.is(response.errors[0].message, 'Expected value of type "ID!", found "5fd5b58efbc2f7"; The id(5fd5b58efbc2f7) is not a valid ID.')
  t.is(response.errors[0].extensions.code, 'BAD_ID')
})

test('[VISITOR][GRAPHQL] Get all posts without filters', async t => {
  const response = await queries_graphql.get_posts({})
  // The random post + the static one
  t.is(response.get_posts.length, parseInt(process.env.SEEDING_NUMBER) + 1)
})

test('[VISITOR][REST] Get all posts', async t => {
  const response = await queries_rest.get_posts('/post', {})
  t.is(response.length, parseInt(process.env.SEEDING_NUMBER) + 1)
})

test('[VISITOR][REST] Get all posts with limit', async t => {
  const response = await queries_rest.get_posts('/post', { limit: 1 })
  t.is(response.length, 1)
})

test('[VISITOR][REST] Get all posts with limit and skip', async t => {
  const response_limit_2 = await queries_rest.get_posts('/post', { limit: 2 })
  t.is(response_limit_2.length, 2)
  const response_limit_1 = await queries_rest.get_posts('/post', { limit: 1, skip: 1 })
  t.is(response_limit_1.length, 1)
  t.is(response_limit_2[1].title, response_limit_1[0].title)
  t.is(response_limit_2[1].content, response_limit_1[0].content)
})

test('[VISITOR][REST] Get all posts with title without space', async t => {
  const response = await queries_rest.get_posts('/post', { title: 'post' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][REST] Get all posts with title with space', async t => {
  const response = await queries_rest.get_posts('/post', { content: 'content of' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][REST] Get no posts with title that does not exist', async t => {
  const response = await queries_rest.get_posts('/post', { title: 'ZzzzzZZZ' })
  t.is(response.length, 0)
})

test('[VISITOR][REST] Get all posts with title with regex', async t => {
  const response = await queries_rest.get_posts('/post', { title: 'post.*' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][GRAPHQL] Get all posts with limit to 1', async t => {
  const response = await queries_graphql.get_posts({ limit: 1 })
  t.is(response.get_posts.length, 1)
})

test('[VISITOR][GRAPHQL] Get all posts with limit to 12', async t => {
  const response = await queries_graphql.get_posts({ limit: 12 })
  t.is(response.get_posts.length, 12)
})

test('[VISITOR][GRAPHQL] Get all posts with skip', async t => {
  const response_full = await queries_graphql.get_posts({})
  const second_response = response_full.get_posts[1]
  const response_skipped = await queries_graphql.get_posts({ skip: 1 })
  t.is(response_skipped.get_posts[0].title, second_response.title)
  t.is(response_skipped.get_posts[0].content, second_response.content)
})

test('[VISITOR][GRAPHQL] Get all posts with skip and limit', async t => {
  const response_full = await queries_graphql.get_posts({ limit: 2 })
  const second_response = response_full.get_posts[1]
  t.is(response_full.get_posts.length, 2)
  const response_skipped = await queries_graphql.get_posts({ skip: 1, limit: 2 })
  t.is(response_skipped.get_posts[0].title, second_response.title)
  t.is(response_skipped.get_posts[0].content, second_response.content)
  t.is(response_skipped.get_posts.length, 2)
})

test('[VISITOR][GRAPHQL] Get all posts with order', async t => {
  const response_ascending = await queries_graphql.get_posts({ order: constants.order_ascending })
  const last_response_ascending = response_ascending.get_posts[response_ascending.get_posts.length - 1]
  const response_descending = await queries_graphql.get_posts({ order: constants.order_descending })
  t.is(response_descending.get_posts[0].title, last_response_ascending.title)
  t.is(response_descending.get_posts[0].content, last_response_ascending.content)
})

test('[VISITOR][GRAPHQL] Get all posts with filter on title', async t => {
  const response = await queries_graphql.get_posts({ title: /The only post/ })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][GRAPHQL] Get bo posts with filter on title', async t => {
  const response = await queries_graphql.get_posts({ title: /zzZZZzzzzZZZ/ })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR][GRAPHQL] Get all posts with filter on content', async t => {
  const response = await queries_graphql.get_posts({ content: /content of/ })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][GRAPHQL] Get no posts with filter on content', async t => {
  const response = await queries_graphql.get_posts({ content: /Idontexist/ })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR][GRAPHQL] Get no posts with filter on title and content with joint and', async t => {
  const response = await queries_graphql.get_posts({ title: /The only post/, content: /zzZZZzzzzZZZ/, joint: constants.joint_and })
  t.is(response.get_posts.length, 0)
})

test('[VISITOR][GRAPHQL] Get all posts with filter on title and content with joint or', async t => {
  const response = await queries_graphql.get_posts({ title: /The only post/, content: /zzZZZzzzzZZZ/, joint: constants.joint_or })
  t.is(response.get_posts.length, 1)
  t.is(response.get_posts[0].title, 'The only post not randomly created')
  t.is(response.get_posts[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][GRAPHQL] Get all posts sorted with title and content', async t => {
  const response_sorted_title = await queries_graphql.get_posts({ sort: 'title' })
  const response_sorted_content = await queries_graphql.get_posts({ sort: 'content' })
  t.not(response_sorted_title.get_posts[0], response_sorted_content.get_posts[0])
})

test('[VISITOR][GRAPHQL] Get all posts sorted with a key that does not exist', async t => {
  const response = await queries_graphql.get_posts({ sort: 'try' })
  t.is(response.errors[0].message, 'The key (try) is not available for sorting')
})

test('[VISITOR][GRAPHQL] Add a post by args', async t => {
  const response = await queries_graphql.add_post_by_args({ title: 'My test title', content: 'My test content' })
  t.is(response.add_post_by_args.title, 'My test title')
  t.is(response.add_post_by_args.content, 'My test content')
})

test('[VISITOR][REST] Add a post by args', async t => {
  const response = await queries_rest.add_post_by_args('/post', { title: 'My Rest title', content: 'My Rest content' })
  t.is(response.title, 'My Rest title')
  t.is(response.content, 'My Rest content')
})

test('[VISITOR][GRAPHQL] Add a post by args with missing content arg', async t => {
  const response = await queries_graphql.add_post_by_args({ title: 'My test title' })
  t.is(response.errors[0].message, 'Field "add_post_by_args" argument "content" of type "String!" is required, but it was not provided.')
})

test('[VISITOR][GRAPHQL] Add a post by args with missing title arg', async t => {
  const response = await queries_graphql.add_post_by_args({ content: 'My test content' })
  t.is(response.errors[0].message, 'Field "add_post_by_args" argument "title" of type "String!" is required, but it was not provided.')
})

test('[VISITOR][GRAPHQL] Add a post by args with wrong title type', async t => {
  const response = await queries_graphql.error_add_post_by_args({ title: 12, content: 'My test content' })
  t.is(response.errors[0].message, 'String cannot represent a non string value: 12')
})

test('[VISITOR][REST] Update a post', async t => {
  const response = await queries_rest.update_post_by_id('/post', '5fd5b58efbc2f7a33c2aa001', { title: 'Updated title', content: 'The updated content', deleted: false })
  t.is(response.title, 'Updated title')
  t.is(response.content, 'The updated content')
  t.is(response.deleted, false)
})

test('[VISITOR][GRAPHQL] Update a post', async t => {
  const response = await queries_graphql.update_post_by_id('5fd5b58efbc2f7a33c2aa001', { title: 'Updated title', content: 'The updated content', deleted: false })
  t.is(response.update_post_by_id.title, 'Updated title')
  t.is(response.update_post_by_id.content, 'The updated content')
  t.is(response.update_post_by_id.deleted, false)
})

test('[VISITOR][REST] Delete a post', async t => {
  const response = await queries_rest.delete_post_by_id('/post', '5fd5b58efbc2f7a33c2aa001')
  t.is(response, true)
  const response_deleted = await queries_graphql.delete_post_by_id('5fd5b58efbc2f7a33c2aa001')
  console.log(response_deleted)
  t.is(response_deleted.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa001) does not exist.')
})

test('[VISITOR][GRAPHQL] Delete a post', async t => {
  const response = await queries_graphql.delete_post_by_id('5fd5b58efbc2f7a33c2aa001')
  t.is(response.delete_post_by_id, true)
  const response_deleted = await queries_graphql.delete_post_by_id('5fd5b58efbc2f7a33c2aa001')
  t.is(response_deleted.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa001) does not exist.')
})
