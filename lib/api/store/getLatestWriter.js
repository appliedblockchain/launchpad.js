'use strict'

const handler = async (ctx, next) => {
  ctx.body = 'someId0x12345'

  await next()
}

module.exports = {
  method: 'get',
  path: '/value/latestWriter',
  handler
}
