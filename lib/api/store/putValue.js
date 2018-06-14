'use strict'

const handler = async (ctx) => {
  ctx.body = 'OK'
}

module.exports = {
  method: 'put',
  path: '/value',
  handler
}
