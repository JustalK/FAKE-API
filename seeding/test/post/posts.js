'use strict'
const faker = require('faker')
const mongoose = require('mongoose')

/**
* Create n random posts in the database
* @param {number} number_post The number of post to create
* @return {[Post]} Return the random post created
**/
const creating_fake_posts = (number_post) => {
  return Array.from({ length: number_post }, () => ({
    _id: mongoose.Types.ObjectId(),
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(),
    deleted: faker.datatype.boolean()
  }))
}

module.exports = [
  ...creating_fake_posts(process.env.SEEDING_NUMBER || 100),
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa001'),
    title: 'The only post not randomly created',
    content: 'The content of the only post not created randomly.',
    deleted: false
  },
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa002'),
    title: 'The Rest API Title',
    content: 'The Rest API Content',
    deleted: false
  }
]
