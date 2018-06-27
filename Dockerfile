FROM node:8.4.0

WORKDIR /app
COPY . /app

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
RUN npm i --only=production

EXPOSE 8080

CMD [ "npm", "start" ]
