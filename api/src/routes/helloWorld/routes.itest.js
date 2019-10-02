const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')

let app

const URL = '/api/hello'

describe(`GET ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
  })

  afterAll(async () => {
    await app.close()
  })

  it('responds with hello world', async () => {
    const { status, body } = await request(app)
      .get(URL)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)

    expect(status).toEqual(200)
    expect(body.message).toEqual(expect.any(String))
  })

  it('can set the value', async () => {
    const { status, body } = await request(app)
      .post(URL)
      .set('Content-Type', 'application/json')
      .send({ message: 'hello test' })
      .expect('Content-Type', /json/)

    expect(status).toEqual(200)
    expect(body.success).toEqual(true)
  })
})
