/**
 * @param {string} name 
 * @returns {Array}
 * @description Returns a list of paths that will be deleted
 */
const excluded = name => {
  // Extend this list to remove additional files
  const list = [
    '/api/test/*'
  ]

  return list.map(l => `${name}${l}`)
}

module.exports = excluded