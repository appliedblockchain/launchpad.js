"use strict";

const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const { resolve, join } = require("path");
const Web3 = require("web3");
const contractsDirectory = join(__dirname, "../build/contracts");
const contractsFilenames = fs.readdirSync(contractsDirectory);

const contrcacts = {};
contractsFilenames.forEach(file => {
  const fileString = fs.readFileSync(join(contractsDirectory, file));

  try {
    const contract = JSON.parse(fileString);
    contrcacts[contract.contractName] = contract;
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

// master mnemonic for default pubKey: 'safe knife gown business middle neutral output damage offer silent comfort trouble'
const masterAddress =
  process.env.MASTER_ADDRESS || "0xc62ddDf9Df6b42B127831aA98D292d92Cf8b4871";
const masterPubKey =
  process.env.MASTER_PUBLIC_KEY ||
  "0x790dbe81895d336cb55f81cadce3dad27162f1f4ebe1e7c5b6e46136e4a21f4f644241febef1745cc22a866bcd36e8741246543da46a9c8ca1fbf884278a9496";
(async () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      process.env.PROVIDER || "http://localhost:8545"
    )
  );

  try {
    const { abi, bytecode } = contrcacts.Notes;
    let Notes = new web3.eth.Contract(abi, { from, data: bytecode });
    Notes = await Notes.deploy({ arguments: [masterPubKey] }).send(sendParams);

    const addresses = `
export NOTES_ADDRESS="${Notes.options.address}"
`;
    const path = join(__dirname, "..", "exportAddresses.sh");
    fs.writeFileSync(path, addresses);
    console.log("done:\n", addresses);
    console.log(`addresses saved at ${path}`);
  } catch (err) {
    if (err.message === 'Invalid JSON RPC response: ""') {
      console.error("Error: Unable to connect to network, is parity running?");
    } else {
      console.error(err);
    }
  }
})();
