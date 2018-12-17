'use strict'

const { contracts } = require('../../../util/web3')

const getHelloWorld = async ctx => {
  const { HelloWorld } = contracts
  const helloWorldString = await HelloWorld.methods.getHelloWorld().call()

  ctx.ok({ message: helloWorldString })
}

const setHelloWorld = async ctx => {
  const { message } = ctx.request.body
  const { HelloWorld } = contracts
  await HelloWorld.methods.updateHelloWorld(message).send()
  ctx.ok(message)
}

module.exports = {
  getHelloWorld,
  setHelloWorld
}
