const request = require('supertest')
const setupAppForTest = require('../test/utils.js')
const {
  statuses
} = require('./healthcheck')

const contracts = require('../contracts')

let app
let contractAddresses

const URL = '/health'

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
    contractAddresses = Object.keys(contracts).map(
      contractName => contracts[contractName].address)

  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with the current contract address', async () => {
    const { status, body } = await request(app)
      .get(URL)
      .expect('Content-Type', /json/)

    expect(status).toEqual(200)
    expect(body.services.parity).toEqual(statuses.OK)
    expect(body.gitCommitHash).toEqual(expect.any(String))
  })
})
