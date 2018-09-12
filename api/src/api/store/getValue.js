'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  try {
    const result = await methods.get().call()
    if (!result) {
      throw new Error('There was no data found at this contract')
    }

    ctx.ok({ result: result })
  } catch (error) {
    ctx.badRequest({ error })
  }
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
