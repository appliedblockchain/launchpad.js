'use strict'

const handler = async (ctx) => {
  ctx.body = 'STORE'
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
