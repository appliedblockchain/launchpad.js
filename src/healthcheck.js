const { healthcheck: abHealthcheck } = require('@appliedblockchain/koa-healthcheck')

// GIT_COMMIT_SHA and GIT_TAG are populated when creating the docker image
const healthcheck = (contractAddress) => {
  return abHealthcheck({
    custom: {
      storeContractAddress: contractAddress,
      commit: process.env.GIT_COMMIT_SHA || 'No commit was passed into this build',
      tag: process.env.GIT_TAG || 'There was no tag associated with this build'
    }
  })
}

module.exports = healthcheck
