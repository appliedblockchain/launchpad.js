const HelloWorld = artifacts.require('HelloWorld')

contract('HelloWorld', (accounts) => {
  let helloWorld
  let from
  const _helloEthereum = 'Hello Ethereum'

  beforeEach(async () => {
    from = accounts[0]
    helloWorld = await HelloWorld.new({ gas: 5000000, from })
  })

  it('read hello world', async () => {
    const _helloWorld = await helloWorld.getHelloWorld()
    expect(_helloWorld).to.equal('Hello World')
  })

  it('update hello world', async () => {
    const tx = await helloWorld.updateHelloWorld(_helloEthereum)
    expect(tx.logs[0].event).to.equal('helloWorldUpdated')

    const _helloWorld = await helloWorld.getHelloWorld()
    expect(_helloWorld).to.equal(_helloEthereum)
  })
})
