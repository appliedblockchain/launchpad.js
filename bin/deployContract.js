const deploy = require('@appliedblockchain/contract-artefacts-deployer')

deploy('store-contract')
  .then(({ contractAddress, version }) => {
    console.log('contractAddress', contractAddress)
    console.log('version', version)
  })
