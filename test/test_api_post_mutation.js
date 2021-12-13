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

test('[VISITOR] Update a post', async t => {
  const response = await queries_post.update_post_by_id('5fd5b58efbc2f7a33c2aa001', { title: 'Updated title', content: 'The updated content', deleted: false })
  t.is(response.update_post_by_id.title, 'Updated title')
  t.is(response.update_post_by_id.content, 'The updated content')
  t.is(response.update_post_by_id.deleted, false)
})

test('[VISITOR] Delete a post', async t => {
  const response = await queries_post.delete_post_by_id('5fd5b58efbc2f7a33c2aa001')
  t.is(response.delete_post_by_id, true)
  const response_deleted = await queries_post.delete_post_by_id('5fd5b58efbc2f7a33c2aa001')
  t.is(response_deleted.errors[0].message, 'The object with id(5fd5b58efbc2f7a33c2aa001) does not exist.')
})
