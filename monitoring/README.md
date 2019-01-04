# Monitoring Using Prometheus and Grafana

## Prometheus 

**TODO:** Add more details


## Docker Engine Setup
Docker engine should be running with metrics address `0.0.0.0:9323`

[Configure Docker](https://docs.docker.com/config/thirdparty/prometheus/#configure-docker)

Linux Machine: `/etc/systemd/system/docker.service.d/docker.conf` 

```shell
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd -H fd:// \
  --storage-driver=overlay2 \
  --dns 8.8.4.4 --dns 8.8.8.8 \
  --experimental=true \
  --metrics-addr 0.0.0.0:9323
```

## Docker Compose with Prometheus

```shell
docker-compose -f docker-compose.yml -f add-prometheus.yml up prometheus
```
