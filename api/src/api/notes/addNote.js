'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { web3 } = ctx

  try {
    const { rawTransaction } = ctx.request.body
    await web3.eth.sendSignedTransaction(rawTransaction)

    ctx.ok('Note saved successfully')
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
  path: '/notes',
  handler
}
