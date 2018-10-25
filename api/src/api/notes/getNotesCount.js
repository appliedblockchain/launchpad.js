'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  try {
    const result = await methods.getNotesCount().call()
    if (!result) {
      return ctx.ok({ result: { count: Number(result) } })
    } else {
      ctx.ok(result)
    }
  } catch (error) {
    ctx.badRequest({ error: `${error}` })
  }
}

module.exports = {
  method: 'get',
  path: '/notes/count',
  validate: {
    output: {
      200: {
        body: Joi.object()
      }
    }
  },
  handler
}
