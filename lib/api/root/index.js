'use strict'

const handler = async (ctx) => {
  ctx.body = 'hello world'
  console.log('CONTEXT', ctx)
}

module.exports = [
  {
    method: 'get',
    path: '/',
    handler
  }
]
