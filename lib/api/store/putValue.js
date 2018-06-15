'use strict'

const { DEFAULT_GAS_AMOUNT } = require('../../constants')

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const { body } = ctx.request
  const { data } = body

  await methods.set(data).send({
    gas: DEFAULT_GAS_AMOUNT
  })
}

module.exports = {
  method: 'put',
  validate: { type: 'json' },
  path: '/store',
  handler
}
module.exports.handler = handler
