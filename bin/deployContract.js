const deploy = require('@appliedblockchain/contract-artefacts-deployer')

const name = process.argv[2]

if (!name) {
  throw new Error(
    'You must provide a contract name to deploy as an ' +
    'argument to the deployContract.js script'
  )
} else {
  deploy(name)
    .then(({ contractAddress }) => {
      process.stdout.write(contractAddress)
      process.exit(0)
    }).catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
