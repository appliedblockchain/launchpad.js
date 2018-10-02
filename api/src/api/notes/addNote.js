'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi
const Mantle = require('@appliedblockchain/mantle')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')

const handler = async ctx => {
  const { web3, contracts: { NotesContract } } = ctx

  try {
    const { mnemonic, params } = ctx.request.body
    const contract = {
      abi: NotesContract._jsonInterface,
      address: process.env.CONTRACT_ADDRESS,
      name: 'Notes'
    }

    const mantle = new Mantle({ provider: ETHEREUM_JSONRPC_ENDPOINT })
    mantle.loadMnemonic(mnemonic)
    mantle.loadContract(contract)

    const rawTransaction = await mantle.signTransaction({
      params: params,
      contractName: contract.name,
      methodName: 'addNote'
    })

    await web3.eth.sendSignedTransaction(rawTransaction)
    ctx.ok('Note saved successfully')
  } catch (error) {
    ctx.badRequest({ error: `${error}` })
  }
}

module.exports = {
  method: 'post',
  validate: {
    output: {
      200: {
        body: {
          message: Joi.string()
        }
      }
    }
  },
  path: '/notes',
  handler
}
