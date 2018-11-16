const request = require('supertest')
const setupAppForTest = require('../test/utils.js')
const {
  GIT_COMMIT_SHA_DEFAULT,
  GIT_TAG_DEFAULT
} = require('./healthcheck')

let app

const URL = '/health'

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with the current contract address', async () => {
    const { status, body } = await request(app)
      .get(URL)
      .expect('Content-Type', /json/)

    expect(status).toEqual(200)
    expect(body.parityStatus).toEqual('Running')
    expect(body.storeContractAddress).toEqual(process.env.CONTRACT_ADDRESS)
    expect(body.commit).toEqual(GIT_COMMIT_SHA_DEFAULT)
    expect(body.tag).toEqual(GIT_TAG_DEFAULT)
    expect(body.latestBlockNumber).toBeGreaterThan(0)
  })
})
