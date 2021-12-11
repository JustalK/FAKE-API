'use strict'
const faker = require('faker')

const creating_fake_posts = (number_post) => {
  return Array.from({ length: number_post }, () => ({
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs()
  }))
}

module.exports = creating_fake_posts(10)
