FROM node:8.4.0

WORKDIR /app
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

ENV GIT_COMMIT_SHA ${GIT_COMMIT_SHA}
ENV GIT_TAG ${GIT_TAG}

COPY package.json /app/package.json
RUN npm i --only=production

COPY . /app

EXPOSE 8080

CMD [ "npm", "start" ]
