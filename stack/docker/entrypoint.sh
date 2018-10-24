#!/usr/bin/env sh

set -ex

sleep 5
PARITY_KEY="mantle-development/parity-nodes"
PARITY_INSTANCES="parity1 parity2 parity3"

for i in 1 2 3
do
  for j in 1 2 3
  do
    ENODE_EXISTS=$(npx @appliedblockchain/consul check-key-exists "mantle-development/parity$j")
    if [ "$ENODE_EXISTS" = "false" ]; then
      continue
    fi

    ENODE=$(npx @appliedblockchain/consul get-kv "mantle-development/parity$j")
    echo "$ENODE" >>reserved_peers
  done
done