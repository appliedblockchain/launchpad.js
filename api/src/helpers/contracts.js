const env = require('../env.js')

module.exports = {
  notes: env.NOTES_ADDRESS.trim().toLowerCase(),
  users: env.USERS_ADDRESS.trim().toLowerCase()
}
