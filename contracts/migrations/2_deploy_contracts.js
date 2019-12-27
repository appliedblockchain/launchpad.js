const helloWorld = artifacts.require('HelloWorld')

module.exports = function (deployer) {
  deployer.deploy(helloWorld)
}
