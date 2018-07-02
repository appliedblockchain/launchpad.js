const { healthcheck: abHealthcheck } = require('@appliedblockchain/koa-healthcheck')
const commitSha = process.env.GIT_COMMIT_SHA
const gitTag = process.env.GIT_TAG

const healthcheck = (contractAddress) => {
  return abHealthcheck({
    custom: {
      storeContractAddress: contractAddress,
      commit: commitSha || 'No commit was passed into this build',
      tag: gitTag || 'There was no tag associated with this build'
    }
  })
}

module.exports = healthcheck
