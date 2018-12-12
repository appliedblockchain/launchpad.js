# Launchpad 

What is Launchpad?  
Base app to start new project. The repository is monorepo with api, contract and placeholder for react (frontend) application.
We are required to use this app as starter for any projects as it provides a good default for API, writing Contracts,
CI/CD (CircleCI) & deployment.

## Features:
- Contracts and contract deployment
- Basic api structure to start from
- A place holder for react app to be added on
- Continious Integration (Full CircleCI configuration to check contract, api and react)
- Parity backup and restore *(uses Amazon S3)*
- Sentry integration for Error Monitoring (Optional)
- Elasticsearch integration (Optional)
- CLI to create project
- Docker for development
- Docker swarm deployment 

## Directories

- [Webapp](./react) - Placeholder for Front-end React application
- [API](./api) - Node.js API
- [Contracts](./contracts) - Ethereum Solidity contracts
- [Docs](./docs) - Documentation, guides, notes, etc
- [docker-dev](./docker-dev) - Docker development environment with hot reload for the api and react
- [sentry](./sentry) - Readme on how to integrate sentry
- [CLI](./cli) - Launchpad CLI to create base app quickly

## How to develop

### Local Setup with Docker (recommended)
To run the project locally you will require `docker` and `docker-compose`.

Please follow detail instruction [here](https://github.com/appliedblockchain/base-app-mantle/tree/master/docker-dev#how-to-use)

> Note: It is recommended to use docker base local setup.

### Local setup without docker

1. [Running **Ethereum Blockchain** node locally](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

  **Options**  
  * [Ganache](https://truffleframework.com/ganache)
  * [Parity](https://wiki.parity.io/Setup)
  * [Geth](https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html)


2. [Compile and deploy Contracts](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

  Solidity Contract required to be compiled and deployed onto blockchain.

3. [Running API](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

4. [Running react application (WebApp)](https://github.com/appliedblockchain/base-app-mantle/tree/master/react#getting-started)


## Running the staging docker-compose locally

1. Build the images: `docker-compose build --build-arg TEST_MODE=true --build-arg NPM_TOKEN=$NPM_TOKEN`
2. Start the stack: `docker-compose up`
3. Wait for the parity cluster is UP (the logs will show a similar output: `parity2_1        | 2018-11-12 18:11:32 UTC Imported #500 0x4a7f…b06e (0 txs, 0.00 Mgas, 0 ms, 0.57 KiB)`)
4. deploy the contracts: `node contracts/bin/deploy.js`
5. Stop the stack(CTRL+C)
6. Load the contract addresses in your shell: `source api/contracts/exportAddresses.sh`
7. Start the stack again `docker-compose up`
8. If you need to push the images to docker hub, make sure to rebuild the react container with test mode disabled fist: `docker-compose build --build-arg --build-arg NPM_TOKEN=$NPM_TOKEN react`
