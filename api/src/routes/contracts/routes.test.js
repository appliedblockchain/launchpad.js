const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')

let app

const URL = '/api/block-explorer-config'

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with the config', async () => {
    return request(app)
      .get(URL)
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
