'use strict'


const elasticsearch = require('elasticsearch')
const config = require('config')
const { ignoreNumberedKeys } = require('../util/util')

const client = new elasticsearch.Client({
  host: `http://${config.elasticsearch.host}:9200/`
})


const TYPE = 'note'
const LIMIT = 10 // amount of documents returned at once


const health = async () => {
  const resp = await client.cluster.health({})
  console.log('-- clinet Health --', resp)
}


const ignoreAlreadyExist = async(err) => {
  if (err.body && err.body.error && err.body.error.type === 'resource_already_exists_exceptions') {
    return
  }
  throw err
}


const formatAsset = (asset) => {
  asset = ignoreNumberedKeys(asset)
  asset.id = parseInt(asset.id)
  Object.assign(asset, JSON.parse(asset.info))

  if (typeof asset.info === 'object') {
    delete asset.info
  }
  return asset
}


const upsertAsset = async (asset) => {
  const formatted = formatAsset(asset)
  await client.index({
    index: asset.type ? asset.type.toLowerCase() : TYPE,
    id: asset.id,
    type: TYPE,
    body: formatted
  })
}


const search = async (quesryString, offset) => {
  const results = await client.search({
    from: offset,
    size: LIMIT,
    q: quesryString
  })

  return results.hits.hits
}


const deleteAsset = async (id) => {
  let result = await search(id)

  result = result[0]

  if (result) {
    const asset = result._source

    await client.delete({
      index: asset.type ? asset.type.tolowercase() : TYPE,
      id: asset.id,
      type: TYPE
    })
  }
}


const init = async () => {
  await client.indices.create({ index: TYPE }).catch(ignoreAlreadyExist).catch(console.error)

  const body = {
    index_patterns: [ '*' ],
    settings: {
      'index.mapping.ignore_malformed': true
    },
    mappings: {
      asset: {
        properties: {
          id: { type: 'text' },
          createdTime: { type: 'text' }
        }
      }
    }
  }

  await client.indices.putTemplate({ name: 'protect_mapping', body })
}



module.exports = {
  health,
  ignoreAlreadyExist,
  formatAsset,
  upsertAsset,
  deleteAsset,
  search,
  init
}


