'use strict'

const router = require('koa-joi-router')
const { chunk } = require('lodash')
const { utils } = require('web3')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  try {
    const result = await methods.getNote(ctx.params.id).call()
    const {
      0: tag,
      1: encryptedText,
      2: author,
      3: addresses,
      4: encKeys
    } = result
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
    if (!encryptedText) {
      ctx.status = 404
      return ctx.notFound({ result: null })
    } else {
      ctx.ok({
        result: {
          tag,
          encryptedText,
          author,
          addresses,
          credentials
        }
      })
    }
  } catch (error) {
    console.error(error)
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
