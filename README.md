# Base App

Mono-repo with awith Base App Example

## Directories

- [Webapp](./react) - Front-end React application
- [API](./api) - Node.js API
- [Contracts](./contracts) - Ethereum Solidity contracts
- [Docs](./docs) - Documentation, guides, notes, etc
- [docker-dev](./docker-dev) - Docker development environment with hot reload for the api and react


## Local Setup with Docker (recommended)
To run the project locally you will require `docker` and `docker-compose`.

Please follow detail instruction [here](https://github.com/appliedblockchain/base-app-mantle/tree/master/docker-dev#how-to-use)

> Note: It is recommended to use docker base local setup.

## Local setup without docker

1. [Running **Ethereum Blockchain** node locally](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

  ** Options**
  * [Ganache](https://truffleframework.com/ganache)
  * [Parity](https://wiki.parity.io/Setup)
  * [Geth](https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html)


2. [Compile and deploy Contracts](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

  Solidity Contract required to be compiled and deployed onto blockchain.

3. [Running API](https://github.com/appliedblockchain/base-app-mantle/tree/master/api#run-blockchain-network-and-contract-deployment)

4. [Running react application (WebApp)](https://github.com/appliedblockchain/base-app-mantle/tree/master/react#getting-started)
