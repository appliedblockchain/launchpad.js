'use strict'

const router = require('koa-joi-router')
const { utils } = require('web3')
const Joi = router.Joi

const handler = async ctx => {
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract
  const {
    body: { tag, encryptedText, author, credentials }
  } = ctx.request

  const addresses = []
  let keys = []
  for (const key in credentials) {
    const { address, encSymKey } = credentials[key]
    addresses.push(address)
    keys = [ ...keys, ...utils.hexToBytes(encSymKey) ]
  }

  const estimatedGasUsage = await methods
    .addNote(tag, encryptedText, author, addresses, utils.bytesToHex(keys))
    .estimateGas()
  try {
    await methods
      .addNote(tag, encryptedText, author, addresses, utils.bytesToHex(keys))
      .send({
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
