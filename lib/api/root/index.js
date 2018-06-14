'use strict'

const handler = async (ctx) => {
  ctx.body = 'hello world'
}

module.exports = [
  {
    method: 'get',
    path: '/',
    handler
  }
]
