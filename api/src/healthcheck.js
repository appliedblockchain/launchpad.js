const { readFileSync } = require('fs')

const GIT_COMMIT_SHA_DEFAULT = 'No commit was passed into this build'
const constants = {
  OK: 'OK',
  DOWN: 'DOWN'
}

const getVersion = async (web3) => {
  try {
    const version = await web3.eth.getProtocolVersion()
    if (!version) {
      return { status: constants.DOWN }
    }
    return { status: constants.OK }
  } catch (err) {
    return { status: constants.DOWN }
  }
}

const getCommitHash = () => {
  if (process.env.CI === 'true') {
    return null
  }
  const hash = readFileSync('../.git/refs/heads/master')
  return hash.toString().trim()
}


const healthcheck = (contractAddress, web3) => {
  return async (ctx) => {
    const { status } = await getVersion(web3)
    if (status === constants.DOWN) {
      ctx.status = 503
    }
    ctx.body = {
      services: {
        parity: status,
      },
      gitCommitHash: getCommitHash() || GIT_COMMIT_SHA_DEFAULT,
    }
  }
}


module.exports = {
  healthcheck,
  constants
}
