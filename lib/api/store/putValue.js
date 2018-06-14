'use strict'

const {
  StoreContract,
  address: storeContractAddress
} = require('../../setupWeb3')
const { DEFAULT_GAS_AMOUNT } = require('../../constants')

const requestHandler = async (ctx, contract, address) => {
  const { body } = ctx.request
  const { data } = body

  const { methods } = contract
  const from = await address()

  await methods.set(data).send({
    from,
    gas: DEFAULT_GAS_AMOUNT
  })
}

module.exports = {
  method: 'put',
  validate: { type: 'json' },
  path: '/value',
  handler: async (ctx) => (
    await requestHandler(ctx, StoreContract, storeContractAddress)
  )
}
module.exports.requestHandler = requestHandler
