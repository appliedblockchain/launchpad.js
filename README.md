# Launchpad

## What is Launchpad?

Launchpad is the ideal scaffolding to start a new project. The repository is a monorepo with an api, contract and placeholder for react (frontend) application. It provides a good default for your API, writing contracts, CI/CD (CircleCI) and deployment.

## Features:

- Contracts and contract deployment
- Basic api structure to start from
- A placeholder (React) for a frontend app to be added on (with e2e tests already set up)
- Continuous Integration (Full CircleCI configuration to check contract, api and react)
- Parity backup and restoration *(uses Amazon S3)*
- Sentry integration for Error Monitoring (Optional)
- Elasticsearch integration (Optional)
- CLI to create a new project
- Docker for development
- Docker swarm deployment

## Directories

Please refer to the README in each directory for further information

- [Webapp](./react) - Placeholder for Front-end React application
- [API](./api) - Node.js API
- [Contracts](./contracts) - Ethereum Solidity contracts
- [Docs](./docs) - Documentation, guides, notes, etc
- [stack](./stack) - Docker environments - Dev and Swarm --- Dev - Development environment with hot reload for the api and react -- Swarm - Local Staging (no code reloading) and Swarm environment (environment for swarm and kubernetes deployments)
- [CLI](./cli) - Launchpad CLI to create base app quickly

### Stack:

Other than the Dev and Swarm stacks, launchpad also provides:

- [parity](./stack/parity) - Parity Ethereum - Configurations for the Ethereum nodes deployed in the swarm - Remember to regenerate the private keys and to make sure volumes are backed up (private-chain deployments - TODO need a documentation section )
- [backup](./stack/backup) - Parity S3 Backup cronjob
- [explorer](./stack/explorer) - AB block explorer settings
- [sentry](./stack/sentry) - Sentry - exception notification (see readme)
- [logging](./stack/logging) - Elasticsearch, Logstash, Kibana enterprise logging stack
- [monitoring](./stack/monitoring) - Prometheus / Grafana enterprise monitoring stack

### Local Setup with Docker (recommended)
To run the project locally you will require `docker` and `docker-compose`.

1. Cd into `stack`
2. Run `source docker-aliases.sh`
4. Start parity only: `launchpad-compose up parity`
5. While parity is running, deploy the contracts (run `npm run compile && npm run deploy` from the contracts folder, You might need to run `npm i && npm run compile` if you haven't already).
6. Run `launchpad-compose build` to build the images
7. Stop parity and run `launchpad-compose up` to start all the services

### Local setup without docker

1. Run an ethereum blockchain node locally

```bash
cd api
npm run parity
```

Alternatively, if you do not want to use parity, you can run your prefered blockchain client

**Options**
* [Ganache](https://truffleframework.com/ganache)
* [Parity](https://wiki.parity.io/Setup)
* [Geth](https://ethereum.gitbooks.io/frontier-guide/content/getting_a_client.html)

2. Compile and deploy your solidity contracts

```bash
cd contracts
npm i && npm run compile && npm run deploy && npm run install-contracts
```

3. Run the API

```bash
cd api
npm i && npm start
```

4. Run the react app

```bash
cd react
npm i && npm start
```

### Run this app with Docker Staging

`docker-compose up --build`

### Restart API:

`docker-compose up --build api` (in a separate SH)

#### Restart API redeploying contracts:

    docker-compose down -v api && docker-compose up --build api
