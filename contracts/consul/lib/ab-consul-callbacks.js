const resolveUndefined = (reject, operation) => {
  if (operation !== undefined) {
    operation = `Operation: "${operation}" `
  }

  const note = 'Note: If you\'re getting this error while getting a key, the key probably does not exist'
  const error = new Error(`No result returned by Consul API. ${operation}${note}`)
  error.errorType = 'no-result'
  reject(error)
}

const resolveCallback = (resolve, reject, operation) => (
  (key) => (
    (err, result) => {
      if (err) {
        reject(err)
        return
      }

      if (result === undefined) {
        resolveUndefined(reject, operation)
        return
      }

      if (key) {
        result = result[key]
      }

      resolve(result)
    }
  )
)

module.exports = {
  resolveCallback: resolveCallback
}
