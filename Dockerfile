FROM node:8.4.0

WORKDIR /app
COPY . /app

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && npm install && rm ~/.npmrc

EXPOSE 8080

CMD [ "npm", "start" ]
