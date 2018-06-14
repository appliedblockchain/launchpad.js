'use strict'

const handler = async (ctx) => {
  ctx.body = 'OK'
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
