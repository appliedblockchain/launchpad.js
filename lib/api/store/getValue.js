'use strict'

// const { DEFAULT_GAS_AMOUNT } = require('../../constants')

const handler = async (ctx) => {
  console.log('------- GET VALUE ------', ctx.contracts.StoreContract.methods)

  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  const result = await methods.get().call()
  // console.log('------------ RESULT ----------', result)
  // methods.set('SOME DATA').send({
  //   gas: DEFAULT_GAS_AMOUNT
  // })
  console.log('RESULT', result)
  ctx.body = result
}

module.exports = {
  method: 'get',
  path: '/store',
  handler
}
module.exports.handler = handler
