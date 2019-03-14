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

  const receipt = await HelloWorld.methods.updateHelloWorld(message).send()

  ctx.ok({ success: receipt.status === '0x1' })
}

module.exports = {
  getHelloWorld,
  setHelloWorld
}
