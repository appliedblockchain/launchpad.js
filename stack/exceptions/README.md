# With Sentry monitoring

Sentry is additional service to the app for helping monitoring unhandled error in the app.

By default sentry won't be including when doing `docker-compose up`.
Sentry services required to be kicked off separately.

Sentry OnPremise:

https://github.com/getsentry/onpremise/blob/master/README.md

## Volumes

Create volume for sentry to persit data

```shell
docker volume create --name=sentry-data && docker volume create --name=sentry-postgres
```

## Build

Build all images

```shell
docker-compose -f docker-compose.yml -f docker-compose.with-sentry.yml build --build-arg NPM_TOKEN=$NPM_TOKEN
```


## Sentry Setup

### Generate secret key for sentry web

This will generate a key that is used by sentry-web container
> Note: Sentry specific configuration

```shell
docker-compose -f docker-compose.yml -f docker-compose.with-sentry.yml run --rm sentry-web config generate-secret-key
```

The generated key has to be put in `.env` file which is used in `docker-compose.with-sentry.yml`

```shell
> echo 'SENTRY_SECRET_KEY=<generated-key>' > .env
```


### Upgrade sentry database

This will migrate sentry database schema to `postgres` instance
> Note: Sentry specific

```shell
docker-compose -f docker-compose.yml -f docker-compose.with-sentry.yml run --rm sentry-web upgrade
```


## Run Sentry Container

```shell
docker-compose -f docker-compose.yml -f docker-compose.with-sentry.yml run --rm sentry-web upgrade
```
