#!/usr/bin/env bash

function disco() {
  redis-cli -h discovery --raw $*
}

[ "$(disco ping)" == "PONG" ] || { echo "discovery redis not up, exiting..." && exit; }

set -ex

sleep 3

parity --chain /parity/spec.json --config /parity/authority.toml -d /parity/data
