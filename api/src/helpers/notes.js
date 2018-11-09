'use strict'

const { utils } = require('web3')

module.exports = {
  addCredentials: (noteRaw) => {
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
  }
}
