## Node starter app
This is a simple node application which includes api [documentation](https://github.com/koajs/koa/tree/master/docs),
[healthcheck](https://github.com/appliedblockchain/koa-healthcheck), basic [error handling](lib/middleware), a
basic smart contract [setup](lib/setupWeb3.js) and [api use](lib/api).

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started

You will need to run an instance of parity:
```
npm run parity
```

Then deploy the contract:
```
npm run deploy-contract
```

This will copy the contract address to a contractAddress.txt. Once finished, then run:
```
npm i
npm run start:dev
```

### Linting and running tests
```
npm run lint
npm test:watch
```
