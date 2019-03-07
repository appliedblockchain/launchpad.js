#!/usr/bin/env bash

function disco() {
  redis-cli -h discovery --raw $*
}

function run() {
  cd /api
  node run.js
}

TIME=3
CTR_ADDR_PATH=/contracts/build/contractAddresses.json

[ "$(disco ping)" == "PONG" ] || { echo "discovery redis not up, exiting..." && exit; }

set -ex

PARITY_INSTANCES="parity1 parity2 parity3"

sleep $TIME

for PARITY in $PARITY_INSTANCES; do
  ENODE_REQ=$(curl --data '{"method":"parity_enode","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST "$PARITY:8545")
  ENODE=$(echo "$ENODE_REQ" | grep -o "enode.*30303" | sed -e "s/\@.*/\@$PARITY:30303\"/" | sed -e "s/\"//g")
  disco set "enodes:$PARITY" "$ENODE"
done

sleep $TIME

for i in 1 2 3; do
  for j in 1 2 3; do
    ENODE=$(disco get "enodes:parity$j")
    curl --data '{"method":"parity_addReservedPeer","params":["'"$ENODE"'"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST parity"$i":8545
  done
done

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
disco set "cluster-leader" "$HOSTNAME"

if [ -z "$CONTRACT_ADDRESSES" ]; then
  sleep $TIME # TODO: tune or remove

  LEADER=$(disco get cluster-leader)
  CONTRACT_ADDRESSES_EXIST=$(disco get contract-addresses)

  # Only re-deploy if no contract address exists, otherwise the address will already be available in consul
  if [ -z "$CONTRACT_ADDRESSES_EXIST" ]; then

    if [ "$HOSTNAME" = $LEADER ]; then
      echo "PROVIDER: $PROVIDER"
      mkdir -p /contracts/build/contracts
      PROVIDER="$PROVIDER" node /contracts/bin/deploy.js
      CONTRACT_ADDRESSES=$(cat $CTR_ADDR_PATH)

      sleep $TIME
      disco set "contract-addresses" "$CONTRACT_ADDRESSES"
    else
      ADDR_EXISTS=$(disco get "contract-addresses")
      while [ -z "$ADDR_EXISTS" ]; do
          sleep $TIME
      done
    fi
  fi

  disco get "contract-addresses" > $CTR_ADDR_PATH
  echo "Contract Addresses: $(cat $CTR_ADDR_PATH)"

  run
else
  run
fi
