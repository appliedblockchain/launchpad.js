'use strict'
const Joi = require('koa-joi-router').Joi

const handler = async (ctx) => {
  const { HelloWorldContract } = ctx.contracts
  const helloWorldString = await HelloWorldContract.methods.getHelloWorld().call()

  ctx.ok({ message: helloWorldString })
}

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
    handler
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
    handler: async (ctx) => {
      const { message } = ctx.request.body
      const { HelloWorldContract } = ctx.contracts
      await HelloWorldContract.methods.updateHelloWorld(message).send()
      ctx.ok(message)
    }
  }
]
