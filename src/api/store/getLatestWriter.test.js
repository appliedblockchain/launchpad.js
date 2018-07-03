const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')
const { API_PREFIX } = require('../../constants')

let app

const URL = `${API_PREFIX}/store/latestWriter`

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
  })

  afterAll(async () => {
    await app.close()
  })

  it('gets the latest writer of the contract', async () => {
    const { status, body } = await request(app)
      .get(URL)

    expect(status).toEqual(200)
    expect(body).toEqual({ result: expect.any(String) })
  })
})
