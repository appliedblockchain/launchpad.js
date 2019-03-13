FROM node:10.15-alpine

RUN apk --update --no-cache add alpine-sdk git python openssl curl bash vim && \
  rm -rf /tmp/* /var/cache/apk/*

  # Installs latest Chromium (71) package.
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      harfbuzz@edge \
      nss@edge

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN mkdir /home/node/integration

RUN chown -R node:node /home/node/integration

USER node

WORKDIR /home/node/integration

COPY --chown=node:node package.json package.json

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc &&\
  npm i &&\
  rm ~/.npmrc

COPY --chown=node:node . /home/node/integration


CMD npm run test:ci