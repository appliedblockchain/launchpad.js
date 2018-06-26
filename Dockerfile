FROM node:9-alpine

WORKDIR /app
COPY . /app

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && npm install && rm ~/.npmrc
RUN npm i
RUN npm run parity
RUN npm run deploy-contract

EXPOSE 80

CMD [ "npm", "start" ]
