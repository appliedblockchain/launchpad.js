const initConsul = (host, token) => (
  require('consul')({
    host: host,
    port: 443,
    secure: true,
    defaults: {
      token: token
    }
  })
)

module.exports = {
  initConsul
}
