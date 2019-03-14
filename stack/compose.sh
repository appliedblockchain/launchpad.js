#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

set -xe

configArgs=""
configPathList=(docker-compose-dev.yml)
npmrcPath="$HOME/.npmrc"

for path in "${configPathList[@]}"; do
  configArgs="$configArgs -f $path"
done

show_usage() {
  echo "\
Usage:
  $0 -h
  $0 [-t NPM_TOKEN] ARGS...

Flags:
  -h            : Show this message and exit
  -t NPM_TOKEN  : A valid token to access the Applied Blockchain private npm repos. If omitted then the current token will be extracted from '$npmrcPath' and used.

Runs 'docker-compose$configArgs ARGS...'
" | fold -s
}

while getopts "ht:" opt; do
  case $opt in
    h)
      show_usage
      exit
      ;;
    t)
      npmToken="$OPTARG"
      ;;
    \?)
      show_usage
      exit 2
      ;;
  esac
done

shift $((OPTIND - 1))

if [[ -z $npmToken ]]; then
  if [[ ! -f $npmrcPath ]]; then
    echo "$npmPath file not found, so NPM_TOKEN argument required"
    exit 2
  else npmToken="$(cat "$npmrcPath" | grep _authToken |sed 's/.*=\(.*$\)/\1/')"
  fi
fi

CTR_ADDR_PATH=../contracts/build/contractAddresses.json

set +ex

echo 'Loading contracts addresses in env'
export CONTRACT_ADDRESSES=$(cat $CTR_ADDR_PATH)

env COMPOSE_PROJECT_NAME="lauchpad" NPM_TOKEN="$npmToken" docker-compose $configArgs $@
