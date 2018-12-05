'use strict'

const handler = async (ctx) => {
  const { HelloWorldContract } = ctx.contracts
  const helloWorldString = await HelloWorldContract.methods.getHelloWorld().call()

  ctx.ok(helloWorldString)
}

module.exports = [
  {
    method: 'get',
    path: '/',
    handler
  }
]
