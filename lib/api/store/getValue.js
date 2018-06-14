'use strict'

const { StoreContract } = require('../../setupWeb3')

const requestHandler = async (ctx, contract) => {
  const { methods } = contract

  const result = await methods.get().call()

  ctx.body = result
}

module.exports = {
  method: 'get',
  validate: { type: 'json' },
  path: '/store',
  handler: async (ctx) => (
    await requestHandler(ctx, StoreContract)
  )
}
module.exports.requestHandler = requestHandler
