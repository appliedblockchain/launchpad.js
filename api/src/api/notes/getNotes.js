'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  try {
    const notesCount = await methods.getNotesCount().call()

    const notesNumber = Number(notesCount)

    const notesPromises = []
    for (let i = 0; i < notesNumber; ++i) {
      notesPromises.push(methods.getNote(i.toString()).call())
    }

    const notesJSON = await Promise.all(notesPromises)
    const notes = notesJSON.map(noteJson => JSON.parse(noteJson))
    ctx.ok({ result: notes })
  } catch (error) {
    ctx.badRequest({ error })
  }
}

module.exports = {
  method: 'get',
  path: '/notes',
  validate: {
    output: {
      200: {
        body: Joi.object()
      }
    }
  },
  handler
}
