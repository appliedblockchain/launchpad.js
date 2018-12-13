'use strict'
const Joi = require('koa-joi-router').Joi
const { getHelloWorld, setHelloWorld } = require('./handlers/rootHandler')

module.exports = [
  {
    method: 'get',
    path: '/',
    validate: {
      output: {
        200: {
          body: {
            message: Joi.string()
          }
        }
      }
    },
    handler: getHelloWorld
  },
  {
    method: 'post',
    path: '/',
    validate: {
      type: 'json',
      body: {
        message: Joi.string().required()
      }
    },
    handler: setHelloWorld
  }
]
