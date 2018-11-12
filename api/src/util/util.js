'use strict'

/* each key in the contract objects also has a
   numbered key with the same value, we don't need this so make a
   copy of it ignoring the numbered keys.
*/
const ignoreNumberedKeys = (initialObject) => {
  const result = {}

  for (const key in initialObject) {
    if (isNaN(key)) {
      result[key] = initialObject[key]
    }
  }

  return result
}

module.exports = { ignoreNumberedKeys }
