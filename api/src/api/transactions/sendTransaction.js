const fs = require('fs')
const path = require('path')
const router = require('koa-joi-router')
const Joi = router.Joi

const BUILD_PATH = path.join(__dirname, '../../../contracts')
const DOCUMENT_FILENAME = 'transactionDocs.md'


const getTransactionDocs = () => {
  try {
    const docFile = path.join(BUILD_PATH, DOCUMENT_FILENAME)
    const content = fs.readFileSync(docFile)
    return content.toString()
  } catch (_) {
    return 'Please run `npm run get-transaction-api` before running api server'
  }
}

module.exports = {
  method: 'post',
  path: '/transaction',
  meta: {
    friendlyName: 'Signed Trasaction',
    extendedDescription: getTransactionDocs()
  },
  validate: {
    type: 'json',
    body: {
      address: Joi.string().required(),
      rawTransaction: Joi.string().required()
    }
  },
  handler: async ctx => {
    const { rawTransaction } = ctx.request.body
    const receipt = await ctx.web3.eth.sendSignedTransaction(rawTransaction)
    ctx.body = receipt
  }
}
