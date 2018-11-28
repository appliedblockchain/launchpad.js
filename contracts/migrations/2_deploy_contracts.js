const Notes = artifacts.require('Notes')

module.exports = function(deployer) {
  deployer.deploy(Notes)
}
