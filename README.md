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
#### Run tests
```
npm i
npm run tests
```

#### Brief explainer for the uninitiated
This `base-contracts` repo is an example of the most basic form of smart contract
to be run on an Ethereum client ((Parity)[https://wiki.parity.io/]/(Ganache)[http://truffleframework.com/ganache/]).

1. Deploying your contract to an Ethereum client
The circle ci config is setup so that whenever a new tag is published, the project is
also published for use on npm (see 'workflows' section of `.circleci/config.yml`). Also
note the name of the deployed contract `store-contract`, showing in the 'publish to NPM'
section. This will get published using AB's @appliedblockchain/contract-artefacts-publisher,
and will suffix the name with `-artefacts`.

Once the tag is created and the project is on npm, you can test it working by running
parity locally e.g:
```
docker run -p 8545:8545 appliedblockchain/parity-solo --reseal-max-period 1000 --tx-gas-limit 50000000
```

And running: `npx @appliedblockchain/contract-artefacts-deployer store-contract`

This will deploy you contract and provide you with a contract address. It will also publish
an ABI for the contract. These will both be used within your application when instantiating `web3`.

2. Using the smart contract
From within your application, you need to instantiate web3, get the contract from the address
you've published and then use the methods on that contract. In code this looks something like:

At time of writing `1.0.0-beta.33` is the version of web3 needed.

```javascript
// test.js
const Web3 = require('web3')

const abi = require('@appliedblockchain/store-contract-artefacts')
const ethereumClientAddress = 'http://localhost:8545'

const web3 = new Web3(ethereumClientAddress)
// https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const store = new web3.eth.Contract(
  abi,
  'someRandomContractAddress0x12345'
)

const tester = async () => {
  console.log('Set data.')
  // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
  await store.methods.set('{ SOME DATA }').send({
    from: '0x1F2e5282481C07BC8B7b07E53Bc3EF6A8012D6b7',
    gas: 50000000
  })

  // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-call
  const data = await store.methods.get().call()
  console.log('Get data:', data)
}

tester()
```

Then run the file with `node test.js` and you should see:

```javascript
Set data.
Get data: { SOME DATA }
```

If you don't, some further reading: https://web3js.readthedocs.io/en/1.0/web3.html
