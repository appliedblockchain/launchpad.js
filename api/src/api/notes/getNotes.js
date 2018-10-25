'use strict'

const router = require('koa-joi-router')
const { utils } = require('web3')
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

    const notesRaw = await Promise.all(notesPromises)
    const notes = notesRaw.map(noteRaw => {
      const {
        0: tag,
        1: encryptedText,
        2: author,
        3: addresses,
        4: encKeys
      } = noteRaw

      const encKeysBytes = utils.hexToBytes(encKeys)
      const symKeyLength = encKeysBytes.length / addresses.length

      const credentials = {}
      for (let i = 0; i < addresses.length; ++i) {
        const bottom = symKeyLength * i
        const upper = bottom + symKeyLength
        const address = addresses[i]

        credentials[address] = {
          address,
          encSymKey: utils.bytesToHex(encKeysBytes.slice(bottom, upper))
        }
      }

      return {
        tag,
        encryptedText,
        author,
        addresses,
        credentials
      }
    })
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
