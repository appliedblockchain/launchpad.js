"use strict";

const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const { join } = require("path");
const Web3 = require("web3");
const contractsDirectory = join(__dirname, "../build/contracts");
const contractsFilenames = fs.readdirSync(contractsDirectory);

const contracts = {};
contractsFilenames.forEach(file => {
  const fileString = fs.readFileSync(join(contractsDirectory, file));

  try {
    const contract = JSON.parse(fileString);
    contracts[contract.contractName] = contract;
  } catch (err) {
    console.error(`Can not parse ${file}`);
    process.exit(1);
  }
});

const from = process.env.FROM || "0x1F2e5282481C07BC8B7b07E53Bc3EF6A8012D6b7"; // default from for parity-solo

const sendParams = {
  from,
  gas: 50000000
};

(async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      process.env.PROVIDER || "http://localhost:8545"
    )
  );

  try {
    const { abi, bytecode } = contracts.Notes;
    let Notes = new web3.eth.Contract(abi, { from, data: bytecode });
    Notes = await Notes.deploy({ arguments: [] }).send(sendParams);

    const addresses = `export CONTRACT_ADDRESS="${Notes.options.address}"`;
    const path = join(__dirname, "..", "exportAddresses.sh");
    fs.writeFileSync(path, addresses);
    console.log("done:\n", addresses);
    console.log(`addresses saved at ${path}`);

    const appEnvs = `REACT_APP_REST_API_LOCATION=//localhost:8080/api\nREACT_APP_CONTRACT_ADDRESS="${Notes.options.address}"`
    const appPath = join(__dirname, "../../webapp/.env");
    fs.writeFileSync(appPath, appEnvs);
    console.log("done:\n", addresses);
    console.log(`addresses saved at ${appPath}`);
  } catch (err) {
    if (err.message === 'Invalid JSON RPC response: ""') {
      console.error("Error: Unable to connect to network, is parity running?");
    } else {
      console.error(err);
    }
  }
})();
