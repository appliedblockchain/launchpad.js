'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi
const Mantle = require('@appliedblockchain/mantle')

const elastic = require('../../helpers/elasticsearch')
const noteUtil = require('../../helpers/notes.js')

const handler = async (ctx) => {
  const { query, offset, sig } = ctx.request.query
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  if (!query) {
    ctx.throw(400, 'query is required')
    return
  }

  const callHash = Mantle.generateHash(query)

  const recoveredAddress = Mantle.recoverAddress(callHash, sig)

  console.log({ recoveredAddress })

  const advanceQuery = `tag: ${query}, plainText: ${query}, !addresses: ${recoveredAddress}`

  const results = await elastic.advanceSearch(advanceQuery, offset)

  const result = await Promise.all(results.map(r => methods.getNote(r._id).call().then(noteUtil.addCredentials)))

  ctx.body = {
    next: result.length === elastic.LIMIT ? (+offset) + elastic.LIMIT : null,
    result
  }
}

module.exports = {
  method: 'get',
  path: '/notes/search',
  validate: {
    query: {
      query: Joi.string().required(),
      sig: Joi.string().required(),
      offset: Joi.number().default(0)
    },
    output: {
      200: {
        body: Joi.object()
      }
    }
  },
  handler
}
