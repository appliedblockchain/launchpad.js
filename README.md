## Node starter app
This is a simple node application which includes api [documentation](https://github.com/koajs/koa/tree/master/docs),
[healthcheck](lib/api/health), basic [error handling](lib/middleware), a
basic smart contract [setup](lib/setupWeb3.js) and [api use](lib/api).

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started
```
npm i
```
You need to run an instance of parity:
```
docker run -p 8545:8545 appliedblockchain/parity-solo --reseal-max-period 1000 --tx-gas-limit 50000000
```

Then deploy the relevant contract:
```
npx @appliedblockchain/contract-artefacts-deployer ${YOUR_CONTRACT_NAME}
```

Copy that address and run
```
CONTRACT_ADDRESS=${YOUR_CONTRACT_NAME} npm run start:dev
```

### Running tests
```
npm run lint
CONTRACT_ADDRESS=${YOUR_CONTRACT_NAME} npm test:watch
```
