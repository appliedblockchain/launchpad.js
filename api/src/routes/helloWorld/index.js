'use strict'
const t = require('koa-joi-router').Joi
const { getHelloWorld, setHelloWorld } = require('./handlers/helloWorldHandler')

module.exports = [
  {
    method: 'get',
    path: '/hello',
    meta: {
      swagger: {
        summary: "/hello",
        description: 'Retrieves the current hello world message',
        tags: [ 'Hello World' ]
      },
    },
    validate: {
      output: {
        200: {
          body: {
            message: t.string().required().example('abcd', "test").description('Hello world message')
          }
        }
      }
    },
    handler: getHelloWorld
  },
  {
    method: 'post',
    path: '/hello',
    meta: {
      swagger: {
        summary: "/hello",
        description: 'Updates the current hello world message',
        tags: [ 'Hello World' ]
      },
    },
    validate: {
      type: 'json',
      body: {
        message: t.string().required().description('New hello world message')
      },
      output: {
        200: {
          body: {
            success: t.boolean().required().description('success will be true when the value is correctly saved to the blockchain')
          }
        }
      }
    },
    handler: setHelloWorld
  }
]
