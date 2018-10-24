FROM node:10.7-alpine as builder

RUN apk add --update --no-cache alpine-sdk git python && \
  rm -rf /tmp/* /var/cache/apk/*

RUN mkdir /react
WORKDIR /react

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

ENV PATH /react/node_modules/.bin:$PATH
COPY package* /react/
RUN npm i
COPY . /react
RUN npm run build:staging

FROM nginx:alpine
COPY --from=builder /react/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
ARG BASIC_AUTH_HTPASSWD
RUN echo $BASIC_AUTH_HTPASSWD > /etc/nginx/.htpasswd
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
