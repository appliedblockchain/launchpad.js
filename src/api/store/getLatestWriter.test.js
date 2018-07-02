const request = require('supertest')
const createServer = require('../../server')
const { API_PREFIX } = require('../../constants')

let app
let contractAddress

const URL = `${API_PREFIX}/store/latestWriter`

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    contractAddress = process.env.CONTRACT_ADDRESS

    app = await createServer(contractAddress)
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
