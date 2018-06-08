'use strict'

module.exports = async (ctx) => {
  console.log('CTX', ctx)
  const { request } = ctx
  const { method, path } = request

  const message = `${method} ${path}`
  console.log('Not found', ctx.notFound)
  ctx.body = `No endpoint matched your request: ${message}`
}
