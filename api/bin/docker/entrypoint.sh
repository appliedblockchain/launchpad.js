#!/usr/bin/env sh

set -ex

cd /contracts/consul

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
HOST=$(echo "$HOSTNAME")
node consul-lock try-acquire "$HOST"
sleep 5
LEADER=$(node consul-lock check)

if [ "$HOST" = $LEADER ]; then
    cd /contracts && PROVIDER=http://parity1:8545 node ./bin/deploy.js
    CONTRACT_ADDRESSES=$(cat /api/contracts/exportAddresses.sh)
    cd /contracts/consul
    node contract-addresses write "$CONTRACT_ADDRESSES"
else
    while [ $(node consul-lock check) = "$LEADER" ]
    do
        sleep 5
    done
fi

# Leader has finished deploying contract addresses - we can read contract addresses from consul and initialise
cd /contracts/consul
node contract-addresses read > /api/contracts/exportAddresses.sh
cat /api/contracts/exportAddresses.sh
cd /api
npm start
