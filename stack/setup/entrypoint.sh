#!/usr/bin/env sh

function disco() {
  redis-cli -h discovery --raw $*
}

disco flushdb

TIME=2

while [ "$(disco ping)" != "PONG" ]
do
  echo "discovery redis not up, waiting..." && sleep 1;
done

set -ex

PARITY_INSTANCES="parity1 parity2 parity3"

sleep 5

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

echo "Setup completed!"
