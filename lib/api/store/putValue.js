'use strict'

const { StoreContract, address } = require('../../setupWeb3')

const handler = async (ctx) => {
  const { body } = ctx.request
  const { data } = body

  const { methods } = StoreContract
  const from = await address()

  await methods.set(data).send({
    from,
    gas: 50000000
  })
}

module.exports = {
  method: 'put',
  validate: { type: 'json' },
  path: '/value',
  handler
}
