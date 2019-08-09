set -xe

IP_A=34.240.100.168
IP_B=34.254.239.237

ssh root@$IP_A docker login -u abbuilder -p $1
ssh root@$IP_B docker login -u abbuilder -p $1
