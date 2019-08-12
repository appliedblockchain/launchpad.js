# Launchpad

### Run this app with Docker Dev

1. Install docker and docker compose
2. In a terminal, run `source docker-aliases.sh`
3. You might need to run `npm i && npm run compile` in the contracts folder if you haven't already.
4. Start parity only: `launchpad-compose up parity`
5. While parity is running, deploy the contracts(run `npm run deploy` from the contracts folder).
6. Run `launchpad-compose build` to build the api and react images
7. Stop parity and run `launchpad-compose up` to start all the services


### Description

This is a simple node application which includes api documented via koa-docs,
a healtcheck, basic [error handling](lib/middleware), a
smart contract setup.

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started

#### Run blockchain network and contract deployment

You will need to run an instance of parity:

```
npm run parity
```

>**Note**  Next commands will run from the `/contracts` folder make sure you had run
`cd contracts && npm i` first.

```
npm run compile
npm run deploy
```

Then for development, run:

```
npm i
npm run start
```

### Extra info:

For details of how the contract is auto-deployed, please check the npm scripts in package.json.

Or, to manually deploy the contracts and start in production mode:

```
export CONTRACT_ADDRESSES=$(node ./bin/deployContract.js store-contract)
npm run start
```

### Linting and running tests

```
npm run lint
npm test:watch
```

## Pingdom Integration

In order for us to monitor API services downtime, we choose to integrate with Pingdom's monitoring system
to report and notify whenever services are unavailable.
