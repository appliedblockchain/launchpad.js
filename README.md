# Launchpad

What is Launchpad?  
Base app to start new project. The repository is monorepo with api, contract and placeholder for react (frontend) application.
We are required to use this app as starter for any projects as it provides a good default for API, writing Contracts,
CI/CD (CircleCI) & deployment.

## Features:

- Contracts and contract deployment
- Basic api structure to start from
- A place holder for react app to be added on
- Continuous Integration (Full CircleCI configuration to check contract, api and react)
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
- [stack](./stack) - Docker environments - Dev and Swarm --- Dev - Development environment with hot reload for the api and react -- Swarm - Local Staging (no code reloading) and Swarm environment (environment for swarm and kubernetes deployments)
- [CLI](./cli) - Launchpad CLI to create base app quickly

#### Stack:

Other than the Dev and Swarm stacks we have:

- [parity](./stack/parity) - Parity Ethereum - configurations for the Ethereum nodes deployed in the swarm - Remember to regenerate the private keys and to make sure volumes are backed up (private-chain deployments - TODO need a documentation section )
- [backup](./stack/backup) - Parity S3 Backup cronjob
- [explorer](./stack/explorer) - AB block explorer settings
- [sentry](./stack/sentry) - Sentry - exception notification (see readme)
- [logging](./stack/logging) - Elasticsearch, Logstash, Kibana enterprise logging stack
- [monitoring](./stack/monitoring) - Prometheus / Grafana enterprise monitoring stack



## How to develop

### Local Setup with Docker (recommended)
To run the project locally you will require `docker` and `docker-compose`.

Please follow detail instruction [here](https://github.com/appliedblockchain/launchpad/tree/master/docker-dev#how-to-use)

> Note: It is recommended to use docker base local setup.

### Local setup without docker

1. [Running **Ethereum Blockchain** node locally](https://github.com/appliedblockchain/launchpad/tree/master/api#run-blockchain-network-and-contract-deployment)

  **Options**  
  * [Ganache](https://truffleframework.com/ganache)
  * [Parity](https://wiki.parity.io/Setup)
  * [Geth](https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html)


2. [Compile and deploy Contracts](https://github.com/appliedblockchain/launchpad/tree/master/api#run-blockchain-network-and-contract-deployment)

  Solidity Contract required to be compiled and deployed onto blockchain.

3. [Running API](https://github.com/appliedblockchain/launchpad/tree/master/api#run-blockchain-network-and-contract-deployment)

4. [Running react application (WebApp)](https://github.com/appliedblockchain/launchpad/tree/master/react#getting-started)


### Run this app with Docker Dev

1. Install docker and docker compose
2. In a terminal, run `source docker-aliases.sh`
3. You might need to run `npm i && npm run compile` in the contracts folder if you haven't already.
4. Start parity only: `launchpad-compose up parity`
5. While parity is running, deploy the contracts(run `npm run deploy` from the contracts folder).
6. Run `launchpad-compose build` to build the api and react images
7. Stop parity and run `launchpad-compose up` to start all the services


### Run this app with Docker Staging

####  `docker-compose up --build`

### Restart API:

`docker-compose up --build api` (in a separate SH)


#### Restart API redeploying contracts:

    docker-compose down -v api && docker-compose up --build api


---

For any issue or change request notify @makevoid @SeekTheError in the `#launchpad` AB slack channel.
