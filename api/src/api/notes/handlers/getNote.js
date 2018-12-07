'use strict'

const { utils } = require('web3')

module.exports = async ctx => {
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
    ctx.badRequest({ error: `${error}` })
  }
}
