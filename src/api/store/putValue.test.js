const request = require('supertest')
const createServer = require('../../server')
const { API_PREFIX } = require('../../constants')

let app
let contractAddress
let requestData

const URL = `${API_PREFIX}/store`

describe(`POST ${URL}`, () => {
  beforeAll(async () => {
    contractAddress = process.env.CONTRACT_ADDRESS

    app = await createServer(contractAddress)

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
