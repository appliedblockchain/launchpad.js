'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi
const elastic = require('../../helpers/elasticsearch')
const ignoreNumberedKeys = require('../../util/util')

const handler = async (ctx) => {
  const { query, offset } = ctx.request.query
  const { NotesContract } = ctx.contracts
  const { methods } = NotesContract

  if (!query) {
    ctx.throw(400, 'query is required')
    return
  }

  const results = await elastic.search(query, offset)
  console.log(results)
  const matches = await Promise.all(results.map(r => methods.getNote(r._id).call().then(ignoreNumberedKeys)))

  ctx.body = {
    next: matches.length === elastic.LIMIT ? (+offset) + elastic.LIMIT : null,
    matches
  }

}

module.exports = {
  method: 'get',
  path: '/search',
  validate: {
    output: {
      200: {
        body: Joi.object()
      }
    }
  },
  handler
}
