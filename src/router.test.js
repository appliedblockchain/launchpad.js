const request = require('supertest')
const createServer = require('./server')

let app

describe('GET /health', () => {
  beforeAll(async () => {
    const testContractAddress = '0xe3CD7E8bf081c2839B856be723b36F7C809468bA'

    // app = await runApp(testContractAddress)
    app = await createServer(testContractAddress)
  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with the current contract address', async () => {
    expect.assertions(1)
    await request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.status).toEqual(200)
      })
  })
})
