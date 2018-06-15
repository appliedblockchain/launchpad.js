'use strict'

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const result = await methods.getLatestWriter().call()

  ctx.body = result
}

module.exports = {
  method: 'get',
  path: '/store/latestWriter',
  handler
}
module.exports.handler = handler
