## Node starter app
This is a simple node application which includes api [documentation](https://github.com/koajs/koa/tree/master/docs),
[healthcheck](https://github.com/appliedblockchain/koa-healthcheck), basic [error handling](lib/middleware), a
basic smart contract [setup](lib/setupWeb3.js) and [api use](lib/api).

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started

You will need to run an instance of parity:
```
docker run -p 8545:8545 appliedblockchain/parity-solo --reseal-max-period 1000 --tx-gas-limit 50000000
```

Then deploy the contract:
```
npm run deploy-store-contract
```

Copy that address, then run:
```
npm i
npm run start:dev
```

### Linting and running tests
```
npm run lint
npm test:watch
```
