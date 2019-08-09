#!/usr/bin/env bash

function disco() {
  redis-cli -h discovery --raw $*
}

[ "$(disco ping)" == "PONG" ] || { echo "discovery redis not up, exiting..." && exit; }

set -ex

sleep 3

rm -f reserved_peers

for i in 1 2 3; do
  ENODE=$(disco get "enodes:parity$i")
  echo "$ENODE" >> reserved_peers
done


parity --chain /parity/spec.json --config /parity/authority.toml -d /parity/data
