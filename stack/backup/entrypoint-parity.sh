#!/usr/bin/env bash

function disco() {
  redis-cli -h discovery --raw $*
}

[ "$(disco ping)" == "PONG" ] || { echo "discovery redis not up, exiting..." && exit; }

set -ex

if [ "$1" = "restore" ]; then
  node /parity/download.js "$2"
  tar -xzvf "$2" -C /

  exit
fi

sleep 3

for i in 1 2 3; do
  ENODE=$(disco get "enodes:parity$i")
  echo "$ENODE" >> reserved_peers
done

# NOTE: uncomment to activate backups
# node /parity/parity-backup-cron-setup.js

/parity/parity --chain /parity/spec.json --config /parity/authority.toml -d /parity/data
