'use strict'

const { join } = require('path')
const contractAbisPath = join(__dirname, '../../../contracts/contractABIs.json')
const contractABIs = require(contractAbisPath)
const { contracts, web3 } = require('../../util/web3')
const { clone } = require('lodash')
const Joi = require('koa-joi-router').Joi

let blockExplorerConfig
function makeBlockExplorerConfig() {
  blockExplorerConfig = {
    contracts: clone(contractABIs),
    addressBook: process.env.ADDRESS_BOOK ? JSON.parse(process.env.ADDRESS_BOOK) : {}
  }


  Object.keys(blockExplorerConfig.contracts).forEach(key => {
    blockExplorerConfig.contracts[key].deployments = [ { address: web3.utils.toChecksumAddress(contracts[key].options.address) } ]
  })

  Object.keys(blockExplorerConfig.addressBook).forEach(key => {
    if (web3.utils.toChecksumAddress(key) !== key) {
      blockExplorerConfig.addressBook[web3.utils.toChecksumAddress(key)] = blockExplorerConfig.addressBook[key]
      delete blockExplorerConfig.addressBook[key]
    }
  })

  return blockExplorerConfig
}


module.exports = [
  {
    method: 'get',
    path: '/block-explorer-config',
    validate: {
      output: {
        200: {
          body: {
            contracts: Joi.object(),
            addressBook: Joi.object()
          }
        }
      }
    },
    handler: (ctx) => {
      throw new Error('BOOOOM')
      ctx.ok(blockExplorerConfig || makeBlockExplorerConfig())
    }
  }
]
