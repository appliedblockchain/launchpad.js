set -xe

IP_1=34.251.116.57
IP_2=54.229.203.198

ssh root@$IP_1 docker pull appliedblockchain/launchpad-api
ssh root@$IP_1 docker pull appliedblockchain/launchpad-react
ssh root@$IP_1 docker pull appliedblockchain/launchpad-parity1
ssh root@$IP_1 docker pull appliedblockchain/launchpad-parity2
ssh root@$IP_1 docker pull appliedblockchain/launchpad-parity3
ssh root@$IP_2 docker pull appliedblockchain/launchpad-api
ssh root@$IP_2 docker pull appliedblockchain/launchpad-react
ssh root@$IP_2 docker pull appliedblockchain/launchpad-parity1
ssh root@$IP_2 docker pull appliedblockchain/launchpad-parity2
ssh root@$IP_2 docker pull appliedblockchain/launchpad-parity3

scp ../docker-compose.yml root@$IP_1:/root/docker-compose.yml

ssh root@$IP_1 docker stack deploy --with-registry-auth -c docker-compose.yml launchpad
