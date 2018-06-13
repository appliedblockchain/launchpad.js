'use strict'

const handler = async (ctx, next) => {
  ctx.body = 'OK'

  await next()
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
