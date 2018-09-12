const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')
const { API_PREFIX } = require('../../constants')

let app
let requestData

const URL = `${API_PREFIX}/store`

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()

    requestData = {
      data: { name: 'foo', email: 'bar' }
    }
    // post to put data into the contract
    await request(app)
      .post(URL)
      .send(requestData)
  })

  afterAll(async () => {
    await app.close()
  })

  it('gets data from the smart contract', async () => {
    const { status, body } = await request(app)
      .get(URL)

    expect(status).toEqual(200)
    expect(body).toEqual({ result: requestData })
  })
})
