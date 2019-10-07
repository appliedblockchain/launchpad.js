set -xe

IP_1=xxxx1
IP_2=xxxx2

ssh root@$IP_1 "docker node update --label-add node_id=1 \$(docker node ls --format \"{{.ID}}\" | sed -n '1p')"
ssh root@$IP_1 "docker node update --label-add node_id=2 \$(docker node ls --format \"{{.ID}}\" | sed -n '2p')"
