const request = require('supertest')
const createServer = require('./server')
const env = require('./env')
const { getContractAddress } = require('./helpers')

let app
let contractAddress

describe('router', () => {
  beforeAll(async () => {
    contractAddress = getContractAddress(env.CONTRACT_ADDRESS)

    app = await createServer(contractAddress)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/health', () => {
    describe('GET', () => {
      it('responds with the current contract address', async () => {
        const { status, body } = await request(app)
          .get('/health')
          .expect('Content-Type', /json/)

        expect(status).toEqual(200)
        expect(body).toEqual({ storeContractAddress: contractAddress })
      })
    })
  })

  describe('/api (root)', () => {
    describe('GET', () => {
      it('returns 200', async () => {
        const { status, body } = await request(app)
          .get('/api')

        expect(status).toEqual(200)
        expect(body).toEqual({ message: 'hello world' })
      })
    })

    describe('/store', () => {
      const requestData = {
        data: { name: 'foo', email: 'bar' }
      }

      describe('POST', () => {
        it('posts data to the smart contract', async () => {
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
