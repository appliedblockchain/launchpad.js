'use strict'

module.exports = async ctx => {
  const { contracts: { NotesContract } } = ctx

  const contract = {
    abi: NotesContract._jsonInterface,
    address: process.env.CONTRACT_ADDRESS,
    name: 'Notes'
  }

  ctx.ok(contract)
}
