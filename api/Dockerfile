FROM node:10.15-alpine as builder

RUN apk add --update --no-cache alpine-sdk git python && \
  rm -rf /tmp/* /var/cache/apk/*

WORKDIR /api

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

COPY ./api/package* /api/
RUN npm install --only=production

RUN mkdir /contracts

COPY ./contracts/package* /contracts/
RUN cd /contracts && npm install --only=production

# stage 2
FROM node:10.15-alpine

RUN apk --update --no-cache add alpine-sdk git python openssl curl bash redis && \
  rm -rf /tmp/* /var/cache/apk/*

COPY --from=builder /api /api
COPY --from=builder /contracts /contracts

WORKDIR /api

# TODO: check if we need this
RUN cd /api && npm install --only=production
RUN cd /contracts && npm install --only=production

COPY ./.git/refs/heads/* ./.git/refs/heads/
COPY ./.git/HEAD ./.git/HEAD

COPY ./api .
COPY ./contracts /contracts

EXPOSE 3000

CMD [ "bash", "bin/docker/entrypoint.sh" ]
