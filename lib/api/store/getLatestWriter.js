'use strict'

const handler = async (ctx) => {
  ctx.body = 'someId0x12345'
}

module.exports = {
  method: 'get',
  path: '/value/latestWriter',
  handler
}
