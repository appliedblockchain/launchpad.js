'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  try {
    const result = await methods.getNote().call()
    if (!result) {
      return ctx.ok({ result: [] })
    } else {
      ctx.ok(result)
    }
  } catch (error) {
    console.log(error)
    ctx.badRequest({ error })
  }
}

module.exports = {
  method: 'get',
  path: '/notes',
  validate: {
    output: {
      200: {
        body: Joi.array()
      }
    }
  },
  handler
}
