'use strict'

const Mantle = require('@appliedblockchain/mantle')

const elastic = require('../../../helpers/elasticsearch')
const noteUtil = require('../../../helpers/notes.js')

module.exports = async (ctx) => {
  const { query, offset, sig } = ctx.request.query
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  if (!query) {
    ctx.throw(400, 'query is required')
    return
  }

  const callHash = Mantle.generateHash(query)
  const recoveredAddress = Mantle.recoverAddress(callHash, sig)

  const terms = query.replace(/ +/, ' ').split(' ')

  let advanceQuery = ''
  terms.forEach(t => {
    advanceQuery += `tag: ${t}, plainText: ${t},`
  })

  advanceQuery += ` $addresses: ${recoveredAddress}`

  const results = await elastic.advanceSearch(advanceQuery, offset)

  const result = await Promise.all(results.map(r => methods.getNote(r._id).call().then(noteUtil.addCredentials)))

  ctx.body = {
    next: result.length === elastic.LIMIT ? (+offset) + elastic.LIMIT : null,
    result
  }
}
