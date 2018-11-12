## Node starter app
This is a simple node application which includes api [documentation](https://github.com/koajs/koa/tree/master/docs),
[healthcheck](https://github.com/appliedblockchain/koa-healthcheck), basic [error handling](lib/middleware), a
basic smart contract [setup](lib/setupWeb3.js) and [api use](lib/api).

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started

### Run blockchain network and contract deployment
You will need to run an instance of parity:
```
npm run parity
```
>**Note**  Next commands will run from the `/contracts` folder make sure you had run
`cd /contracts npm i` first.
```
npm run compile
npm run deploy
```

Then for development, run:
```
npm i
npm run start
```
For details of how the contract is auto-deployed, please check the npm scripts in package.json.

Or, to manually deploy the contracts and start in production mode:
```
export CONTRACT_ADDRESS=$(node ./bin/deployContract.js store-contract)
npm run start
```

### Linting and running tests
```
npm run lint
npm test:watch
```


### Running the staging docker-compose locally

1. Build the images: `docker-compose build --build-arg NPM_TOKEN=$NPM_TOKEN`
2. Start the stack: `docker-compose up`
3. Wait for the parity cluster is UP (the logs will show a similar output: `parity2_1        | 2018-11-12 18:11:32 UTC Imported #500 0x4a7f…b06e (0 txs, 0.00 Mgas, 0 ms, 0.57 KiB)`)
4. deploy the contracts: `node contracts/bin/deploy.js`
5. Stop the stack(CTRL+C)
6. Load the contract addresses in your shell: `source api/contracts/exportAddresses.sh`
7. Start the stack again `docker-compose up`