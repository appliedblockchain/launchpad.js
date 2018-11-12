#!/bin/bash

# alias to docker-compose with the development compose file hard wired, you can start build the stack by running  "compose build" for instance.
alias mantle-compose="mantle_compose_dev $@"

# alias compose-integration="docker_compose_integration $@"

# list the running docker containers
alias dcl="docker container list"

# list the existing docker volumes
alias dvl="docker volume list"

# Interactive session with runnig containers

# ssh into a container, take the container id as a parm
alias cssh="docker_ssh $1"

# ssh into a container, take the container image name or a part of the id.
alias dssh="image_ssh $1"

if [ -n "$ZSH_VERSION" ]; then
  MANTLE_APP_DIR=`dirname $0:A`
else
  MANTLE_APP_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
fi

# Function used for the aliases
mantle_compose_dev () {
  $MANTLE_APP_DIR/compose.sh $@
}

docker_ssh () { docker exec -it $1 bash || docker exec -it $1 sh; }

image_ssh () {
  if [[ $1 == "-h" || $1 == "--help" ]]
  then
    echo 'dssh: "ssh" into a running docker container.'
    # echo "|"
    echo "Usage:"
    echo "    dssh EXPRESSION. EXPRESSION can be any key word that match against a running container id or image name, Run dcl for a list of currently running containers."
  else
    id=`docker container list | tr -s ' ' | cut  -f1 -f2 -d" " |grep "$1" | cut  -f1 -d" "`;
    docker_ssh $id;
  fi
}
