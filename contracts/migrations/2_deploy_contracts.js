const Notes = artifacts.require('./Notes.sol')

module.exports = function(deployer) {
  deployer.deploy(Notes)
}
