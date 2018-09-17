'use strict'

const router = require('koa-joi-router')
const { chunk } = require('lodash')
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
      const keysArr = chunk(
        utils.hexToBytes(encKeys),
        encKeys.length / addresses.length
      ).map(el => utils.bytesToHex(el))
      const credentials = {}
      for (let i = 0; i < addresses.length; ++i) {
        const address = addresses[i]
        credentials[address] = {
          address,
          encSymKey: keysArr[i]
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
