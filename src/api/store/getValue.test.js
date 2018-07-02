const request = require('supertest')
const createServer = require('../../server')
const { API_PREFIX } = require('../../constants')

let app
let contractAddress
let requestData

describe('router', () => {
  beforeAll(async () => {
    contractAddress = process.env.CONTRACT_ADDRESS

    app = await createServer(contractAddress)

    requestData = {
      data: { name: 'foo', email: 'bar' }
    }
    // post to put data into the contract
    await request(app)
      .post(`${API_PREFIX}/store`)
      .send(requestData)
  })

  afterAll(async () => {
    await app.close()
  })

  describe(`${API_PREFIX}`, () => {
    describe('/store', () => {
      describe('GET', () => {
        it('gets data from the smart contract', async () => {
          const { status, body } = await request(app)
            .get(`${API_PREFIX}/store`)

          expect(status).toEqual(200)
          expect(body).toEqual({ result: requestData })
        })
      })
    })
  })
})
