const { resolveCallback } = require('./ab-consul-callbacks')

module.exports = (consul) => {

  const getPeers = () => (
    new Promise((resolve, reject) => {
      consul.status.peers(resolveCallback(resolve, reject)())
    })
  )

  const getKv = (key) => (
    new Promise((resolve, reject) => {
      consul.kv.get(key, resolveCallback(resolve, reject, `getKv: ${key}`)('Value'))
    })
  )

  const kvExists = (key) => (
    new Promise((resolve, reject) => {
      consul.kv.get(key, resolveCallback(resolve, reject, `kvExists: ${key}`)('Value'))
    }).catch((err) => {
      if (err && err.errorType === 'no-result') {
        return Promise.resolve(false)
      }
    })
  )

  const setKv = (key, value) => (
    new Promise((resolve, reject) => {
      consul.kv.set(key, value, resolveCallback(resolve, reject, `setKv: ${key}`)())
    })
  )

  return {
    getPeers: getPeers,
    getKv: getKv,
    kvExists: kvExists,
    setKv: setKv
  }
}
