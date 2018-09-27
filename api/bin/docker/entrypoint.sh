#!/usr/bin/env sh

set -ex

# cd /contracts/consul && node consul-lock try-acquire "$(whoami)"

# cd /contracts/consul && node consul-lock check "$(whoami)"

cd /contracts && PROVIDER=http://parity1:8545 node ./bin/deploy.js

CONTRACT_ADDRESSES=$(cat /api/contracts/exportAddresses.sh)

cd /contracts/consul && node contract-addresses write "$CONTRACT_ADDRESSES"

sleep $(((RANDOM % 5) + 1))

echo "----------------------------"

cd /contracts/consul && node contract-addresses read > /api/contracts/exportAddresses.sh

cat  /api/contracts/exportAddresses.sh

cd /api

npm start
