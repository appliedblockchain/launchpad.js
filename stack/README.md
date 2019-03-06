# Stack

Stack information for deployment with parity nodes, prometheus, grafana and others.

## Prometheus

Metrics source

## Grafana

Dashboard service

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
docker-compose -f docker-compose.yml -f add-prometheus.yml up
```


## Possible Usage
* Multiple datasource from different metrics datasources (e.g. Postgres, Azure, AWS)
* Use of Prometheus Alert to sent alerts
* Basic app metrics should be determined in launch pad
* Prometheus Dashbaord can be added by default which can be imported Prometheus Datasource tab
* Grafana Cloud can be use instead of Grafana container

## Known Issues
* Settting prometheus datasource to be browser
  Prometheus datasource is not accessible via grafana and should be changed to `Browser` instead of `Server`

# Docker Dev
## How to Use

1. Install docker and docker compose
2. In a terminal, run `source docker-aliases.sh`
3. You might need to run `npm i && npm run compile` in the contracts folder if you haven't already.
4. Start parity only: `mantle-compose up parity`
5. While parity is running, deploy the contracts(run `npm run deploy` from the contracts folder).
6. Run `mantle-compose build` to build the api and react images
7. Stop parity and run `mantle-compose up` to start all the services