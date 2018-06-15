'use strict'

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts

  const result = await StoreContract.methods.get().call()

  ctx.body = result
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
module.exports.handler = handler
