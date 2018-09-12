## Summary
A basic project with the simplest possible smart contract setup, using
[cobalt](https://github.com/appliedblockchain/cobalt) for testing.

### Prerequisites

Make sure you have the `solc` Solidity compiler installed:

Check with:
```
solc --version
```

If not, download it:
```
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
brew linkapps solidity
```
### Run tests
```
npm i
npm run test
```

----------------------------------

### A brief explainer for the uninitiated
This `base-contracts` repo is an example of the most basic form of smart contract
to be run on an Ethereum client ([Parity](https://wiki.parity.io/)/[Ganache](http://truffleframework.com/ganache/)).

While there are many ways to achieve the end goal of writing/reading data from the
blockchain, this process is here to help replicate how we do this across projects.

The process for getting a smart contract up and running and being used is as follows:

- create smart contract in e.g. Solidity
- publish smart contract to NPM using @appliedblockchain/contract-artefacts-publisher
- run a local Ethereum client
- deploy your contract to that Ethereum client
- instantiate web3 with your deployed contract address
- use methods from your smart contract

1. **create smart contract in e.g. Solidity**

See [example smart contract](contracts/Store.sol).

2. **publish smart contract to NPM using @appliedblockchain/contract-artefacts-publisher**

Publishing the smart contract to NPM is done using circle ci, to coincide with tagged releases.
Setup for this can be found [here](.circleci/config.yml).

Note the name of the deployed contract `store-contract`, showing in the 'publish to NPM'
section of the circle config.

This will get published using our @appliedblockchain/contract-artefacts-publisher,
_and will suffix the name with `-artefacts`_.

It will also publish an ABI for the contract, accessible by simply `require()`'ing it. So
in this instance it would be:
```javascript
const abi = require('@appliedblockchain/store-contract-artefacts')
```
3. **Run a local Ethereum client**

Once the project is published to NPM, run parity (or ganache) locally:
```
docker run -p 8545:8545 appliedblockchain/parity-solo --reseal-max-period 1000 --tx-gas-limit 50000000
```

4. **Deploy your contract to that Ethereum client**

Use @appliedblockchain/contract-artefacts-deployer to deploy the contract:
```
npx @appliedblockchain/contract-artefacts-deployer store-contract
```

This will deploy your contract and provide you with a contract address. This address
will be used alongside the ABI within your application when instantiating `web3.eth.Contract`.

5. **instantiate web3 with your deployed contract address**

From within your application, you need to instantiate web3, get the contract from the address
you've published and then use the methods on that contract.

At time of writing `1.0.0-beta.33` is the version of web3 needed.

A really simple example of this in code looks something like:

```javascript
// exampleSetupWeb3.js
const Web3 = require('web3')
const abi = require('@appliedblockchain/store-contract-artefacts')

const ethereumClientAddress = 'http://localhost:8545'
const web3 = new Web3(ethereumClientAddress)
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const StoreContract = new web3.eth.Contract(
  abi,
  'someRandomContractAddress0x12345'
)

const getFromAddress = async () => {
  const accounts = await web3.eth.getAccounts()
  const fromAddress = accounts[0]

  return fromAddress
}

module.exports = {
  StoreContract: StoreContract,
  address: getFromAddress
}
```
6. **use methods from your smart contract**

```javascript
// test.js
const { StoreContract, address } = require('./exampleSetupWeb3')

const tester = async (data) => {
  console.log('Set data.')
  const { methods } = StoreContract
  const fromAddress = await address()
  // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
  await methods.set(data).send({
    from: fromAddress,
    gas: 50000000
  })

  // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-call
  const data = await methods.get().call()
  console.log('Get data:', data)
}

tester('{ SOME DATA }')
```

This assumes your smart contract has a get and set method as in [here](contracts/Store.sol).

Then run the file with `node test.js` and you should see:

```javascript
Set data.
Get data: { SOME DATA }
```

If you don't, some further reading:
- [web3 docs](https://web3js.readthedocs.io/en/1.0/web3.html)
- [AB contract publisher](https://github.com/appliedblockchain/contract-artefacts-publisher)
- [AB contract deployer](https://github.com/appliedblockchain/contract-artefacts-deployer)
