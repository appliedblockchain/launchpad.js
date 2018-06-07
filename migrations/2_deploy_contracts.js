const Store = artifacts.require('./Store.sol')

module.exports = (deployer) => {
  deployer.deploy(Store)
}
