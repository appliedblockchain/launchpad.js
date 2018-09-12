'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const { body } = ctx.request
  const data = JSON.stringify(body)

  const estimatedGasUsage = await methods.set(data).estimateGas()
  try {
    await methods.set(data).send({
      gas: estimatedGasUsage
    })

    ctx.ok('Data set successfully')
  } catch (error) {
    ctx.badRequest({ error })
  }
}

module.exports = {
  method: 'post',
  validate: {
    output: {
      200: {
        body: {
          message: Joi.string()
        }
      }
    }
  },
  path: '/store',
  handler
}
