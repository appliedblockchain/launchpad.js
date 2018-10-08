#!/usr/bin/env sh

set -ex

cd /contracts/consul

DEPLOYMENT="Pending"
CONTRACT_KEY="mantle-development/contract-addresses"
LEADER_KEY="mantle-development/leader"
DEPLOYMENT_KEY="mantle-development/deployment"

node consul-utility set-key-value $DEPLOYMENT_KEY "Pending"

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
node consul-utility set-key-value $LEADER_KEY "$HOSTNAME"
sleep 2
LEADER=$(node consul-utility get-key-value $LEADER_KEY)

if [ "$HOSTNAME" = $LEADER ]; then
    PROVIDER=http://parity1:8545 node /contracts/bin/deploy.js
    CONTRACT_ADDRESSES=$(cat /api/contracts/exportAddresses.sh)

    sleep 5
    node consul-utility set-key-value $CONTRACT_KEY "$CONTRACT_ADDRESSES"
    node consul-utility set-key-value $DEPLOYMENT_KEY "Complete"
else
    while [ $(node consul-utility get-key-value $DEPLOYMENT_KEY) != "Complete" ]
    do
        sleep 5
    done
fi

# Leader has finished deploying contract addresses - we can read contract addresses from consul and initialise
node consul-utility get-key-value $CONTRACT_KEY > /api/contracts/exportAddresses.sh
cat /api/contracts/exportAddresses.sh
cd /api
npm start
