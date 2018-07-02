'use strict'

const handler = async (ctx) => {
  const { StoreContract } = ctx.contracts
  const { methods } = StoreContract

  try {
    const result = await methods.getLatestWriter().call()
    if (!result) {
      throw new Error('Could not get the latest writer from this contract')
    }

    ctx.ok({ result: result })
  } catch (error) {
    ctx.badRequest({ error })
  }
}

module.exports = {
  method: 'get',
  path: '/store/latestWriter',
  handler
}
