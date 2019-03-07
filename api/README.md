# Launchpad

We need to "fix" this readme. :D ( cards: https://zube.io/applied-blockchain/products/c/378 )

### New Readme Proposed structure

### Run this app with Docker Dev

1. Install docker and docker compose
2. In a terminal, run `source docker-aliases.sh`
3. You might need to run `npm i && npm run compile` in the contracts folder if you haven't already.
4. Start parity only: `launchpad-compose up parity`
5. While parity is running, deploy the contracts(run `npm run deploy` from the contracts folder).
6. Run `launchpad-compose build` to build the api and react images
7. Stop parity and run `launchpad-compose up` to start all the services

### Run this app with Docker Staging



### Contract Deployment

TODO guide on contract deployment

### Run the apps separately

TODO

#### Parity

TODO npm run parity (explain how to docker run parity-solo)

#### API

TODO npm

#### React

Use npm start to start React

    npm start

The react dev server will start on port 3001.

### Explain how to install dependencies for each app

npm install in api, react, contracts


TODO: add postgres database setup

---

### Description

This is a simple node application which includes api [documentation](https://github.com/koajs/koa/tree/master/docs),
[healthcheck](https://github.com/appliedblockchain/koa-healthcheck), basic [error handling](lib/middleware), a
basic smart contract [setup](src/setupWeb3.js) and an [API implementation example](src/api).

For a detailed overview of setting up your smart contracts, [see here.](https://github.com/appliedblockchain/base-contracts)

### Getting started

### Run blockchain network and contract deployment

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
export CONTRACT_ADDRESS=$(node ./bin/deployContract.js store-contract)
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

### Setting up on Slack

Visit [Slack's app manager](https://appliedblockchain.slack.com/apps/manage) for Applied Blockchain.

* Search for **Pingdom** on the list of apps then click on it.
* Click on **Add Configuration**.
* Choose the channel to be notified (use either the project's channel or *projectname-notifications*).
* Click on **Add Pingdom Integration**.

You'll be redirected to a page with more configuration's to add onto Pingdom but for now, all we'll need is the **Webhook URL**.

### Setting up on Pingdom

Visit [Pingdom's Official Website](https://www.pingdom.com/) and login. We should have a shared account on [1Password](https://1password.com/).
There are a couple of checks you should do before actually integrating the monitoring:

- Go to the **Users and teams** tab then **Users**. If you've not been added already, please do it yourself.
- Go to the **Users and teams** tab then **Teams**. If your team/project is not added already, please do and add all the appropriate members.

#### Integrating Pingdom

* Go to **Integration** and click on **Integrations** tab.
* Click on **Add new**. Put an appropriate name to the webhook as well as the **Webhook URL** we've just got from Slack. Click **Save Integration**.
* Go to **Experience Monitoring** and click on the **Uptime** tab.
* Click on **Add new**. A window will popup and you should set the appropriate fields for the API healthcheck route:
  * Name: should be compatible to the project API to be monitored;
  * Web: HTTP(s);
  * URL/IP: *https://* *example.io/api/health*;
    * Optional tab: insert port if needed
  * Who to alert: check your team or individuals;
  * Scroll down the window and check *your webhook* you've inserted on the integration's tab.
  * **Add** the new check you've configured.

You can then try to test the monitoring service by clicking on **Test** within the Uptime window.
