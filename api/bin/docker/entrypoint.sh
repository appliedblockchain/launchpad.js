#!/usr/bin/env sh

set -ex

sleep 15
PARITY_KEY="mantle-development/parity-nodes"
PARITY_INSTANCES="parity1 parity2 parity3"

for PARITY in $PARITY_INSTANCES
do
  ENODE_REQ=$(curl --data '{"method":"parity_enode","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST "$PARITY:8545")
  ENODE=$(echo "$ENODE_REQ" | grep -o "enode.*30303" | sed -e "s/\@.*/\@$PARITY:30303\"/" | sed -e "s/\"//g")
  npx @appliedblockchain/consul set-kv "mantle-development/$PARITY" "$ENODE"
done

sleep 5

for i in 1 2 3
do
  for j in 1 2 3
  do
    ENODE=$(npx @appliedblockchain/consul get-kv "mantle-development/parity$j")
    curl --data '{"method":"parity_addReservedPeer","params":["'"$ENODE"'"],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST parity"$i":8545
  done
done

CONTRACT_KEY="mantle-development/contract-addresses"
LEADER_KEY="mantle-development/leader"

# All nodes will attempt to acquire a lock. The last node to acquire
# the lock is elected as leader
npx @appliedblockchain/consul set-kv $LEADER_KEY "$HOSTNAME"

function run() {
  cd /api
  node run.js
}

if [ -z "$CONTRACT_ADDRESS" ]
then

  sleep 5 # TODO: tune or remove

  LEADER=$(npx @appliedblockchain/consul get-kv $LEADER_KEY)
  CONTRACT_ADDRESSES_EXIST=$(npx @appliedblockchain/consul check-key-exists $CONTRACT_KEY)

  # Only re-deploy if no contract address exists, otherwise the address will already be available in consul
  if [ "$CONTRACT_ADDRESSES_EXIST" = "false" ]; then
    $EXPORT_SH = /api/contracts/exportAddresses.sh

    if [ "$HOSTNAME" = $LEADER ]; then
      PROVIDER="$PROVIDER" node /contracts/bin/deploy.js
      CONTRACT_ADDRESSES=$(cat $EXPORT_SH)

      sleep 5
      npx @appliedblockchain/consul set-kv $CONTRACT_KEY "$CONTRACT_ADDRESSES"
    else
      CONSUL_KEY_EXISTS="@appliedblockchain/consul check-key-exists $CONTRACT_KEY"
      while [ $(npx $CONSUL_KEY_EXISTS) = "false" ]
      do
          sleep 5
      done
    fi
  fi

  npx @appliedblockchain/consul get-kv $CONTRACT_KEY > $EXPORT_SH
  cat     $EXPORT_SH
  source  $EXPORT_SH

  run()
else
  run()
fi
