'use strict'

module.exports = {
  method: 'get',
  path: '/health',
  handler: async ctx => {
    ctx.body = 'OK'
  }
}
