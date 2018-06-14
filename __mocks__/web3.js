
class StoreContract {
  constructor(abi, contractAddress) {
    this.abi = abi
    this.contractAddress = contractAddress
    this.methods = this.getMethods()
  }

  getMethods() {
    return {
      set: jest.fn().mockImplementation(() => {
        return {
          send: jest.fn()
        }
      })
    }
  }
}

class Web3 {
  constructor(ethereumClientAddress) {
    this.ethereumClientAddress = ethereumClientAddress

    this.eth = this.eth()
  }

  eth() {
    const testAddress = '0x9139211574011393291A9EfBC69Bff2D1fBa25CA'

    return {
      Contract: StoreContract,
      getAccounts: () => [ testAddress ]
    }
  }
}

module.exports = Web3
