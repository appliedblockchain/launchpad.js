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

Then for development, run:
```
npm i
npm run start:dev
```
For details of how the contract is auto-deployed, please check the npm scripts in package.json.

Or, to manually deploy the contracts and start in production mode:
```
export CONTRACT_ADDRESS=$(npm run deploy-contract)
npm run start
```

### Linting and running tests
```
npm run lint
npm test:watch
```
