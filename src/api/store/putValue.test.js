const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')
const { API_PREFIX } = require('../../constants')

let app
let requestData

const URL = `${API_PREFIX}/store`

describe(`POST ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()

    requestData = {
      data: { name: 'foo', email: 'bar' }
    }
  })

  afterAll(async () => {
    await app.close()
  })


  it('posts data to the smart contract', async () => {
    const { status, body } = await request(app)
      .post(`${API_PREFIX}/store`)
      .send(requestData)

    expect(status).toEqual(200)
    expect(body).toEqual({ message: 'Data set successfully' })
  })
})
