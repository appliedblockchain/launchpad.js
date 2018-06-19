'use strict'

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const { body } = ctx.request
  const { data } = body

  const estimatedGasUsage = await methods.set(data).estimateGas()

  await methods.set(data).send({
    gas: estimatedGasUsage
  })
}

module.exports = {
  method: 'put',
  validate: { type: 'json' },
  path: '/store',
  handler
}
module.exports.handler = handler
