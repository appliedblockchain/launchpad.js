const request = require('supertest')
const createServer = require('./server')
const env = require('./env')
const { getContractAddress } = require('./helpers')

let app

describe('router', () => {
  beforeAll(async () => {
    const contractAddress = getContractAddress(env.CONTRACT_ADDRESS)

    app = await createServer(contractAddress)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /health', () => {
    it('responds with the current contract address', async () => {
      await request(app).get('/health')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.status).toEqual(200)
        })
    })
  })

  describe('GET /api (root)', () => {
    it('returns 200', async () => {
      const { status, body } = await request(app).get('/api')

      expect(status).toEqual(200)
      expect(body).toEqual({ message: 'hello world' })
    })

    describe('/store', () => {
      const requestData = {
        data: { name: 'foo', email: 'bar' }
      }

      describe('POST', () => {
        it('posts some data to the smart contract', async () => {
          const { status, body } = await request(app)
            .post('/api/store')
            .send(requestData)

          expect(status).toEqual(200)
          expect(body).toEqual({ message: 'Data set successfully' })
        })
      })

      describe('GET', () => {
        it('gets data from the smart contract', async () => {
          const { status, body } = await request(app)
            .get('/api/store')

          expect(status).toEqual(200)
          expect(body).toEqual({ result: requestData })
        })
      })
    })
  })
})
