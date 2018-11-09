'use strict'


const elasticsearch = require('elasticsearch')
const config = require('config')
const { ignoreNumberedKeys } = require('../util/util')

const client = new elasticsearch.Client({
  host: `http://${config.ELASTICSEARCH}:9200/`
})

const TYPE = 'notes'
const LIMIT = 10 // amount of documents returned at once

const internals = {
  makeQueryObject(advanceQueryString) {
    const queryObject = {
      bool: {
        must: [],
        should: []
      }
    }

    advanceQueryString.split(',').map(x => x.trim()).forEach((x => {
      let must = false

      let [ key, value ] = x.split(':').map(x => x.trim()) // eslint-disable-line

      if (key.startsWith('!')) {
        must = true
        key = key.substring(1)
      }

      if (key === 'type') {
        queryObject.type = value
        return
      }

      let obj = {}
      if (value.match(/^>/)) {
        const gt = { gt: value.substring(1) }
        obj.range = {}
        obj.range[key] = gt
      } else if (value.match(/^</)) {
        const lt = { lt: value.substring(1) }
        obj.range = {}
        obj.range[key] = lt
      } else if (value.match(/^0x/)) {
        obj[key] = value
        obj = { match: obj }
      } else {
        obj[key] = {}
        obj[key].value = value
        obj[key].transpositions = true
        obj = { fuzzy: obj }
      }

      if (must) {
        queryObject.bool.must.push(obj)
      } else {
        queryObject.bool.should.push(obj)
      }

    }))

    return queryObject
  }
}

const health = async () => {
  return client.cluster.health({})
}

const ignoreAlreadyExist = async (err) => {
  if (err.body && err.body.error && err.body.error.type === 'resource_already_exists_exception') {
    return
  }
  throw err
}


const format = (asset) => {
  asset = ignoreNumberedKeys(asset)
  asset.id = parseInt(asset.id)
  delete asset.encryptedText
  delete asset.encKeys
  delete asset.author

  return asset
}


const upsert = async (asset) => {
  const formatted = format(asset)
  await client.index({
    index: TYPE,
    id: asset.id,
    type: TYPE,
    body: formatted
  })
}

const objectSearch = async (queryObject, offset) => {
  const type = queryObject.type
  delete queryObject.type

  const search = {
    from: offset,
    size: LIMIT,
    body: {
      query: queryObject
    }
  }

  if (type) {
    search.index = type
  }

  const results = await client.search(search)

  return results.hits.hits
}

const advanceSearch = async (advanceQueryString, offset) => {
  const queryObject = internals.makeQueryObject(advanceQueryString)

  return objectSearch(queryObject, offset)
}


const deleteNote = async (id) => {
  await client.delete({
    index: TYPE,
    id: id,
    type: TYPE
  })
}


const init = async () => {
  let esStarted = false
  while (!esStarted) {
    try {
      await health()
      esStarted = true
    } catch (e) {
      await new Promise(a => setTimeout(a, 1000))
    }
  }

  await client.indices.create({ index: TYPE }).catch(ignoreAlreadyExist).catch(console.error)

  const body = {
    index_patterns: [ '*' ],
    settings: {
      'index.mapping.ignore_malformed': true
    },
    mappings: {
      notes: {
        properties: {
          id: { type: 'integer' },
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
  upsert,
  deleteNote,
  advanceSearch,
  init,
  LIMIT
}
