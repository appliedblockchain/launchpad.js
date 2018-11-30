'use strict'
const elasticsearch = require('elasticsearch')
const config = require('config')

const LIMIT = 10

const client = new elasticsearch.Client({
  host: `http://${config.get('ELASTICSEARCH')}:9200`
})

const internals = {
  makeQueryObject(advanceQueryString) {
    const queryObject = {
      bool: {
        should: [],
        must: [],
        filter: []
      }
    }

    advanceQueryString.split(',').map(x => x.trim()).forEach((x => {
      let matchType

      let [ key, value ] = x.split(':').map(x => x.trim()) // eslint-disable-line

      if (key.startsWith('!')) {
        matchType = 'must'
        key = key.substring(1)
      } else if (key.startsWith('$')) {
        matchType = 'filter'
        key = key.substring(1)
      } else {
        matchType = 'should'
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

      queryObject.bool[matchType].push(obj)
    }))

    return queryObject
  },

  async objectSearch(queryObject, offset) {
    const type = queryObject.type
    delete queryObject.type

    const search = {
      from: offset,
      size: LIMIT,
      body: {
        query: queryObject,
        min_score: 0.1
      }
    }

    if (type) {
      search.index = type
    }

    const results = await client.search(search)

    return results.hits.hits
  }
}

const ignoreAlreadyExist = async (err) => {
  if (err.body && err.body.error && err.body.error.type === 'resource_already_exists_exception') {
    return
  }
  throw err
}

const health = async () => {
  return client.cluster.health()
}

const init = async (types) => {
  let esStarted = false
  while (!esStarted) {
    try {
      await health()
      esStarted = true
    } catch (e) {
      await new Promise(a => setTimeout(a, 1000))
    }
  }

  if (!Array.isArray(types)) {
    throw new Error('index types should be an array')
  }

  await Promise.all(
    types.map(async TYPE => {
      await client.indices.create({ index: TYPE }).catch(ignoreAlreadyExist).catch(console.error)
    })
  )

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


const upsertAsset = async (type, id, asset) => {
  await client.index({
    index: type,
    id: id,
    type: type,
    body: asset
  })
}

const deleteAsset = async (type, id) => {
  await client.delete({
    index: type,
    id: id,
    type: type
  })
}

const search = async (searchQueryString, offset) => {
  const queryObject = internals.makeQueryObject(searchQueryString)

  return internals.objectSearch(queryObject, offset)
}




module.exports = {
  health,
  init,
  upsertAsset,
  deleteAsset,
  search
}
