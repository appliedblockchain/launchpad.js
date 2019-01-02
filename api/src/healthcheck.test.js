const request = require('supertest')
const setupAppForTest = require('../test/utils.js')
const {
  constants
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
    expect(body.services.parity).toEqual(constants.OK)
    expect(body.gitCommitHash).toEqual(expect.any(String))
  })
})
