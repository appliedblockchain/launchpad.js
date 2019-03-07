'use strict'
const Joi = require('koa-joi-router').Joi
const { getHelloWorld, setHelloWorld } = require('./handlers/helloWorldHandler')

module.exports = [
  {
    method: 'get',
    path: '/hello',
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
    path: '/hello',
    validate: {
      type: 'json',
      body: {
        message: Joi.string().required()
      }
    },
    handler: setHelloWorld
  }
]
