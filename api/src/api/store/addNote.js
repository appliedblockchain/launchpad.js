'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  const { body } = ctx.request
  const data = JSON.stringify(body)

  const estimatedGasUsage = await methods.addNote(data).estimateGas()
  try {
    await methods.addNote(data).send({
      gas: estimatedGasUsage
    })

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
