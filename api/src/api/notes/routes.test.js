const request = require('supertest')
const setupAppForTest = require('../../../test/utils.js')
const notesDef = require('../../../contracts/Notes.json')
const { API_PREFIX } = require('../../constants.js')
const Mantle = require('@appliedblockchain/mantle')
const config = require('config')

let app
let encKey
let encrypted
let hash
let mantle
let requestData
let symmetricKey

const PORT = config.get('PORT')
const URL = `${API_PREFIX}/store`

// requires local IPFS to be running and listening on port 5001 to work
describe.skip(`POST ${URL}`, () => {
  beforeAll(async () => {
    app = await setupAppForTest()
    app.listen(PORT)

    requestData = {
      data: { name: 'foo', email: 'bar' }
    }

    mantle = new Mantle({ proxyURL: `http://localhost:${PORT}/api` })
    mantle.loadMnemonic()

    symmetricKey = Mantle.createSymmetricKey()
    encrypted = Mantle.encryptSymmetric(requestData, symmetricKey)
    encKey = Mantle.encrypt(symmetricKey, mantle.publicKey)
  })

  afterAll(async () => {
    await app.close()
  })

  it('uploads data to IPFS', async () => {
    hash = await mantle.ipfs.store(encrypted.toString('base64'))

    expect(hash).toMatch(/^Qm.{44}$/)
  })

  it('posts data to the smart contract', async () => {
    await mantle.loadContract({
      address: process.env.CONTRACT_ADDRESS,
      name: 'Notes',
      abi: notesDef.abi
    })

    const rawTransaction = await mantle.signTransaction({
      params: [ 'tag', hash, mantle.address, [ mantle.address ], `0x${encKey.toString('hex')}` ],
      contractName: 'Notes',
      methodName: 'addNote'
    })

    const { status, body } = await request(app)
      .post(`${API_PREFIX}/tx`)
      .send({ address: mantle.address, rawTransaction })

    expect(status).toEqual(200)
    expect(body.status).toEqual('0x1')
  })
})

