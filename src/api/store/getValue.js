'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const result = await methods.get().call()

  ctx.ok({
    result: result || {}
  })
}

module.exports = {
  method: 'get',
  path: '/store',
  validate: {
    output: {
      200: {
        body: {
          result: Joi.object()
        }
      }
    }
  },
  handler
}
module.exports.handler = handler
