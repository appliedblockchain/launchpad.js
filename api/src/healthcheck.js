const { readFileSync } = require('fs')

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

const getCommitHash = () => {
  if (process.env.CI === 'true') {
    return null
  }

  let hash
  try {
    hash = readFileSync('../.git/refs/heads/master')
  } catch (e) {
    hash = GIT_COMMIT_SHA_DEFAULT
  }


  return hash.toString().trim()
}

let commitHash
const healthcheck = (web3) => {
  return async function healthcheck(ctx, next) {
    if (ctx.path !== '/api/health') {
      return next()
    }

    const { status } = await getVersion(web3)
    if (status === statuses.DOWN) {
      ctx.status = 503
    }

    commitHash = commitHash || getCommitHash()

    ctx.body = {
      services: {
        parity: status
      },
      gitCommitHash: commitHash || GIT_COMMIT_SHA_DEFAULT
    }
  }
}


module.exports = {
  healthcheck,
  statuses
}
