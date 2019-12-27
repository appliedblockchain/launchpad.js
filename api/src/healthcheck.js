const { readFile } = require('fs')
const path = require('path')
const readFileAsync = require('util').promisify(readFile)

const GIT_COMMIT_SHA_DEFAULT = 'No commit was passed into this build'

const statuses = {
  OK: 'OK',
  DOWN: 'DOWN'
}

const getVersion = async (web3) => {
  try {
    const version = await web3.eth.getProtocolVersion()
    if (!version) {
      return { status: statuses.DOWN }
    }
    return { status: statuses.OK }
  } catch (err) {
    return { status: statuses.DOWN }
  }
}

const getCommitHash = async () => {
  if (process.env.CI === 'true') {
    return null
  }

  let hash
  try {
    const head = await readFileAsync(path.join(__dirname, '../.git/HEAD'))
    const branchName = head.toString().trim().slice(16)
    hash = await readFileAsync(path.join(__dirname, `../.git/refs/heads/${branchName}`))
  } catch (e) {
    hash = GIT_COMMIT_SHA_DEFAULT
  }


  return hash.toString().trim()
}

// NOTE: Install knex and pg and uncomment to check the availabilitu of a postgres database
//
// const config = require('config')
// const knex = require('knex')({
//   client: 'pg',
//   connection: config.get('DB_CONNECTION')
// })

// const checkPostgres = async () => {
//   try {
//     await knex.select(1)
//     return 'OK'
//   } catch (err) {
//     return 'KO'
//   }
// }

const checkParity = async (web3) => {
  const { status } = await getVersion(web3)
  if (status === statuses.DOWN) {
    return 'KO'
  }

  return 'OK'
}

let commitHash
const healthcheck = (web3) => {
  return async function healthCheck(context, next) {
    const ctx = context

    if (ctx.path !== '/api/health') {
      return next()
    }

    const services = {
      parity: await checkParity(web3)
      // Uncomment to check for the availability of the postgres db
      // postgres: await checkPostgres()
    }

    ctx.status = Object.values(services).find(x => x === 'KO') ? 503 : 200

    commitHash = commitHash || await getCommitHash()

    ctx.body = {
      globalStatus: ctx.status,
      services,
      gitCommitHash: commitHash || GIT_COMMIT_SHA_DEFAULT
    }
  }
}


module.exports = {
  healthcheck,
  statuses
}
