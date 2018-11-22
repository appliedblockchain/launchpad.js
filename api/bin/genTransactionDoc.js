const fs = require('fs')
const path = require('path')
const util = require('util')
const readFiles = util.promisify(fs.readdir)
const writeFile = util.promisify(fs.writeFile)

const EXCLUDE_CONTRACTS = [ 'Migrations' ]

const BUILD_PATH = path.join(__dirname, '../contracts')
const DOCUMENT_FILENAME = 'transactionDocs.md'

const getFunctionInfo = (oFunc) => {
  const funcName = `**${oFunc.name}** - *method*  \n`
  const funcInputs = oFunc.inputs.map(input => `${input.name} | ${input.type}`)
  return `${funcName}\nname|type\n-|-\n${funcInputs.join('\n')}`
}

const getAbiContent = (file) => {
  const filePath = path.join(BUILD_PATH, file)

  // parse abi json
  console.log(`\tProcessing ${file}`)
  const fileJSON = JSON.parse(fs.readFileSync(filePath))

  const contractName = `#### ${fileJSON.contractName} - *contract*`

  const methods = fileJSON.abi
    .filter(a => a.type === 'function' && a.stateMutability === 'nonpayable')
    .map(getFunctionInfo)

  return `${contractName}\n${methods.join('\n')}`
}


const generateTransactionDocs = async () => {

  console.log('Reading json files.....\n\n')
  // get only abi json file which is to be included
  const files = (await readFiles(BUILD_PATH))
    .filter(f => /\.json$/.test(f))
    .filter(f => !EXCLUDE_CONTRACTS.includes(f.split('.').slice(0, -1).join('.')))

  // read formatted content
  const content = files.map(file => getAbiContent(file)).join('\n\n')

  console.log('Writing document markdown...\n\n')
  await writeFile(path.join(BUILD_PATH, DOCUMENT_FILENAME), content)
}


generateTransactionDocs().then(() => {
  console.log('Documentation is generated')
}).catch(e => {
  console.log(`Error generating documenation\n${e}`)
})
