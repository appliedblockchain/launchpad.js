#!/usr/bin/env sh

set -ex

cd /contracts/consul

CONTRACT_KEY="mantle-development/contract-addresses"
LEADER_KEY="mantle-development/leader"

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
node consul-utility set-key-value $LEADER_KEY "$HOSTNAME"
sleep 2
LEADER=$(node consul-utility get-key-value $LEADER_KEY)
CONTRACT_ADDRESSES_EXIST=$(node consul-utility check-key-exists $CONTRACT_KEY)

# Only re-deploy if no contract address exists, otherwise the address will already be available in consul
if [ "$CONTRACT_ADDRESSES_EXIST" = "false" ]; then
  if [ "$HOSTNAME" = $LEADER ]; then
      PROVIDER=http://parity1:8545 node /contracts/bin/deploy.js
      CONTRACT_ADDRESSES=$(cat /api/contracts/exportAddresses.sh)

      sleep 5
      node consul-utility set-key-value $CONTRACT_KEY "$CONTRACT_ADDRESSES"
  else
      while [ $(node consul-utility check-key-exists $CONTRACT_KEY) = "false" ]
      do
          sleep 5
      done
  fi
fi

node consul-utility get-key-value $CONTRACT_KEY > /api/contracts/exportAddresses.sh
cat /api/contracts/exportAddresses.sh
cd /api
npm start
