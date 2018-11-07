'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi

const noteUtil = require('../../helpers/notes.js')

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

    const notesRaw = await Promise.all(notesPromises)
    const notes = notesRaw.map(noteUtil.addCredentials)
    ctx.ok({ result: notes.reverse() })
  } catch (error) {
    ctx.badRequest({ error: `${error}` })
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
