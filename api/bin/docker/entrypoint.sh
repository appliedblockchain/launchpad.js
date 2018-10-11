#!/usr/bin/env sh

set -ex

CONTRACT_KEY="mantle-development/contract-addresses"
LEADER_KEY="mantle-development/leader"

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
npx @appliedblockchain/consul set-kv $LEADER_KEY "$HOSTNAME"

sleep 5
LEADER=$(npx @appliedblockchain/consul get-kv $LEADER_KEY)
CONTRACT_ADDRESSES_EXIST=$(npx @appliedblockchain/consul check-key-exists $CONTRACT_KEY)

# Only re-deploy if no contract address exists, otherwise the address will already be available in consul
if [ "$CONTRACT_ADDRESSES_EXIST" = "false" ]; then
  if [ "$HOSTNAME" = $LEADER ]; then
      PROVIDER=http://parity1:8545 node /contracts/bin/deploy.js
      CONTRACT_ADDRESSES=$(cat /api/contracts/exportAddresses.sh)

      sleep 5
      npx @appliedblockchain/consul set-kv $CONTRACT_KEY "$CONTRACT_ADDRESSES"
  else
      while [ $(npx @appliedblockchain/consul check-key-exists $CONTRACT_KEY) = "false" ]
      do
          sleep 5
      done
  fi
fi

npx @appliedblockchain/consul get-kv $CONTRACT_KEY > /api/contracts/exportAddresses.sh
cat /api/contracts/exportAddresses.sh
cd /api
npm start
