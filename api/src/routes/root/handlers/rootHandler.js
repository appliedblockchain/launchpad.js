'use strict'

const getHelloWorld = async ctx => {
  const { HelloWorld } = ctx.contracts
  const helloWorldString = await HelloWorld.methods.getHelloWorld().call()

  ctx.ok({ message: helloWorldString })
}

const setHelloWorld = async ctx => {
  const { message } = ctx.request.body
  const { HelloWorld } = ctx.contracts
  await HelloWorld.methods.updateHelloWorld(message).send()
  ctx.ok(message)
}

module.exports = {
  getHelloWorld,
  setHelloWorld
}
