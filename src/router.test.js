const request = require('supertest')
const runApp = require('./app')

let app

describe('GET /health', () => {
  beforeAll(async () => {
    const testContractAddress = '0xe3CD7E8bf081c2839B856be723b36F7C809468bA'

    app = await runApp(testContractAddress)
  })

  it('responds with the current contract address', (done) => {
    request(app)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  afterAll(() => {
    app.close()
  })
})
