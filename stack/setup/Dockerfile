FROM alpine

RUN apk add --update --no-cache curl redis && \
  rm -rf /tmp/* /var/cache/apk/*

COPY entrypoint.sh .

CMD [ "./entrypoint.sh" ]
