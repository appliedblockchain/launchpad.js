'use strict'

const handler = async (ctx) => {
  ctx.ok({ message: 'hello world' })
}

module.exports = [
  {
    method: 'get',
    path: '/',
    handler
  }
]
