'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi
const Mantle = require('@appliedblockchain/mantle')
const config = require('config')

const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')
const abiDecoder = require('abi-decoder')

const elasticsearch = require('../../helpers/elasticsearch.js')
const { utils } = require('web3')

const mantleApi = new Mantle()
mantleApi.loadMnemonic(config.API_MNEMONIC)

async function addToElasticSearch(event, NotesContract) {
  if (event.name === 'NoteAdded') {
    const id = event.events[0].value
    const note = await NotesContract.methods.getNote(id).call()

    note.id = id

    const encKeysBytes = utils.hexToBytes(note.encKeys)
    const symKeyLength = encKeysBytes.length / note.addresses.length

    const credentials = {}
    for (let i = 0; i < note.addresses.length; ++i) {
      const bottom = symKeyLength * i
      const upper = bottom + symKeyLength
      const address = note.addresses[i]
      credentials[address] = utils.bytesToHex(encKeysBytes.slice(bottom, upper))
    }


    if (credentials[mantleApi.address]) {

      const encSymKey = credentials[mantleApi.address]
      const decryptedKey = mantleApi.decrypt(encSymKey)
      note.plainText = Mantle.decryptSymmetric(note.encryptedText, decryptedKey)

      elasticsearch.upsert(note)
    } else {
      console.error('Can\'t add note to elasticsearch, the note is not shared with the server')
    }
  } else {
    console.error(`Event must be of type NoteAdded, type ${event.name}`)
  }
}

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


    const receipt = await web3.eth.sendSignedTransaction(rawTransaction)

    console.log({ receipt })

    const decodedEvents = abiDecoder.decodeLogs(receipt.logs)

    addToElasticSearch(decodedEvents[0], NotesContract)

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
