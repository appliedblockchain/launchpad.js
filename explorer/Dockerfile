FROM appliedblockchain/b-explorer

RUN mkdir /home/explorer/app/bin
RUN cd bin && npm i node-fetch
COPY bin/getConfig.js /home/explorer/app/bin/getConfig.js

CMD node bin/getConfig.js && node server.js
