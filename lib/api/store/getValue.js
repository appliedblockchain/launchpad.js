'use strict'

const { address } = require('../../setupWeb3')

const handler = async (ctx) => {
  console.log('/store ctx', ctx)
  console.log('ADDRESS', await address())
  ctx.body = 'STORE'
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
