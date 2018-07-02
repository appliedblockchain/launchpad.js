const { healthcheck: abHealthcheck } = require('@appliedblockchain/koa-healthcheck')

const GIT_COMMIT_SHA_DEFAULT = 'No commit was passed into this build'
const GIT_TAG_DEFAULT = 'There was no tag associated with this build'

// GIT_COMMIT_SHA and GIT_TAG are populated when creating the docker image
const healthcheck = (contractAddress) => {
  return abHealthcheck({
    custom: {
      storeContractAddress: contractAddress,
      commit: process.env.GIT_COMMIT_SHA || GIT_COMMIT_SHA_DEFAULT,
      tag: process.env.GIT_TAG || GIT_TAG_DEFAULT
    }
  })
}

module.exports = {
  healthcheck,
  GIT_COMMIT_SHA_DEFAULT,
  GIT_TAG_DEFAULT
}
