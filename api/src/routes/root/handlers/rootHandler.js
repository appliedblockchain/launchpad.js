'use strict'

const getHelloWorld = async ctx => {
  const { HelloWorldContract } = ctx.contracts
  const helloWorldString = await HelloWorldContract.methods.getHelloWorld().call()

  ctx.ok({ message: helloWorldString })
}

const setHelloWorld = async ctx => {
  const { message } = ctx.request.body
  const { HelloWorldContract } = ctx.contracts
  await HelloWorldContract.methods.updateHelloWorld(message).send()
  ctx.ok(message)
}

module.exports = {
  getHelloWorld,
  setHelloWorld
}
