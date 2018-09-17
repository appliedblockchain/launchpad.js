'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  try {
    const result = await methods.getNote(ctx.params.id).call()
    if (!result) {
      ctx.status = 404
      return ctx.notFound({ result: null })
    } else {
      const note = JSON.parse(result)
      ctx.ok({ result: note })
    }
  } catch (error) {
    ctx.badRequest({ error })
  }
}

module.exports = {
  method: 'get',
  path: '/notes/:id',
  validate: {
    output: {
      200: {
        body: Joi.object()
      }
    }
  },
  handler
}
