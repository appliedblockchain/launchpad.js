const getContractAddress = (text) => {
  const results = text.match(/0x\S+/)

  return !results ? '' : results[0]
}

module.exports = getContractAddress
