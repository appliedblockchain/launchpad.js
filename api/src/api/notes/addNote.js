'use strict'

const router = require('koa-joi-router')
const Joi = router.Joi
const Mantle = require('@appliedblockchain/mantle')
const config = require('config')

const abiDecoder = require('abi-decoder')

const elasticsearch = require('../../clients/elasticsearch')
const { utils } = require('web3')
const { ignoreNumberedKeys } = require('../../util/util')

const mantleApi = new Mantle()
mantleApi.loadMnemonic(config.API_MNEMONIC)

const SEARCH_INDEX_TYPE = 'notes'

/**
 * @name getNote
 * @desc Read note from the event emied by contract
 * @param {object} event  Event object emitted fcontract
 * @param {object} NotesContract instance of NotesContract
 * @returns {object} Note
 */
const getNote = async (event, NotesContract) => {
  if (event.name === 'NoteAdded') {
    const formatNote = (asset) => {
      asset = ignoreNumberedKeys(asset)
      asset.id = parseInt(asset.id)
      delete asset.encryptedText
      delete asset.encKeys
      delete asset.author

      return asset
    }

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
      return formatNote(note)
    } else {
      throw new Error('Can\'t add note to elasticsearch, the note is not shared with the server')
    }
  } else {
    throw new Error(`Event must be of type NoteAdded, type ${event.name}`)
  }
}

async function addToElasticsearch(event, NotesContract) {
  try {
    const note = await getNote(event, NotesContract)
    elasticsearch.upsertAsset(SEARCH_INDEX_TYPE, note.id, note)
  } catch (_) { } // eslint-disable-line
}


const handler = async ctx => {
  const { web3, contracts: { NotesContract } } = ctx

  try {
    const { rawTransaction } = ctx.request.body

    const receipt = await web3.eth.sendSignedTransaction(rawTransaction)

    const decodedEvents = abiDecoder.decodeLogs(receipt.logs)

    addToElasticsearch(decodedEvents[0], NotesContract)

    ctx.ok('Note saved successfully')
  } catch (error) {
    ctx.badRequest({ error: `${error}` })
  }
}

module.exports = {
  method: 'post',
  validate: {
    type: 'json',
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
