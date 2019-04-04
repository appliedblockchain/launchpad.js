# Launchpad API

For details of how a contract is auto-deployed, please check the npm scripts in package.json.

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

In order for us to monitor API services downtime, we choose to integrate with Pingdom's monitoring system to report and notify whenever services are unavailable.
