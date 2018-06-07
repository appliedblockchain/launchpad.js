module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: process.env.TRUFFLE_PORT || 8545,
      network_id: "*"
    }
  }
}
