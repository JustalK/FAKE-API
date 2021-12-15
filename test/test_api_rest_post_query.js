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

test('[VISITOR][REST] Get all posts', async t => {
  const response = await queries_post.get_posts('/post', {})
  t.is(response.length, parseInt(process.env.SEEDING_NUMBER) + 1)
})

test('[VISITOR][REST] Get all posts with limit', async t => {
  const response = await queries_post.get_posts('/post', { limit: 1 })
  t.is(response.length, 1)
})

test('[VISITOR][REST] Get all posts with limit and skip', async t => {
  const response_limit_2 = await queries_post.get_posts('/post', { limit: 2 })
  t.is(response_limit_2.length, 2)
  const response_limit_1 = await queries_post.get_posts('/post', { limit: 1, skip: 1 })
  t.is(response_limit_1.length, 1)
  t.is(response_limit_2[1].title, response_limit_1[0].title)
  t.is(response_limit_2[1].content, response_limit_1[0].content)
})

test('[VISITOR][REST] Get all posts with title without space', async t => {
  const response = await queries_post.get_posts('/post', { title: 'post' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][REST] Get all posts with title with space', async t => {
  const response = await queries_post.get_posts('/post', { content: 'content of' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})

test('[VISITOR][REST] Get no posts with title that does not exist', async t => {
  const response = await queries_post.get_posts('/post', { title: 'ZzzzzZZZ' })
  t.is(response.length, 0)
})

test('[VISITOR][REST] Get all posts with title with regex', async t => {
  const response = await queries_post.get_posts('/post', { title: 'post.*' })
  t.is(response.length, 1)
  t.is(response[0].title, 'The only post not randomly created')
  t.is(response[0].content, 'The content of the only post not created randomly.')
})
