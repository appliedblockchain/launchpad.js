# How to Use

1. Install docker and docker compose
2. In a terminal, run `source docker-aliases.sh`
3. You might need to run `npm i && npm run compile` in the contracts folder if you haven't already.
4. Start parity only: `mantle-compose up parity`
5. While parity is running, deploy the contracts(run `npm run deploy` from the contracts folder).
6. Run `mantle-compose build` to build the api and react images
7. Stop parity and run `mantle-compose up` to start all the services
