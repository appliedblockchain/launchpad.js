'use strict'

const { StoreContract } = require('../../setupWeb3')

const requestHandler = async (ctx, contract) => {
  const { methods } = contract

  const result = await methods.getLatestWriter().call()

  ctx.body = result
}

module.exports = {
  method: 'get',
  path: '/store/latestWriter',
  handler: async (ctx) => (
    await requestHandler(ctx, StoreContract)
  )
}
module.exports.requestHandler = requestHandler
