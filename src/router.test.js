const request = require('supertest')
const createServer = require('./server')

let app

describe('GET /health', () => {
  beforeAll(async () => {
    const testContractAddress = '0x7cB6577EcDc3C0Fsad9d45ca44D6Db6e8EB3dAFD95'

    app = await createServer(testContractAddress)
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
