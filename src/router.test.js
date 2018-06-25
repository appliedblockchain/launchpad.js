const request = require('supertest')
const createServer = require('./server')
const env = require('./env')
const { getContractAddress } = require('./helpers')

let app

describe('GET /health', () => {
  beforeAll(async () => {
    const contractAddress = getContractAddress(env.CONTRACT_ADDRESS)

    app = await createServer(contractAddress)
  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with the current contract address', async () => {
    await request(app).get('/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.status).toEqual(200)
      })
  })
})
