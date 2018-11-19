import Mantle from '@appliedblockchain/mantle'
import cryptography from 'utils/cryptography'

export const performEncryptMnemonic = userData => {
  const { mnemonic, password } = userData
  return cryptography.encrypt(mnemonic, password)
}

export const performGenerateMnemonic = () => {
  return Mantle.generateMnemonic()
}

export const performLoadMnemonic = mnemonicString => {
  const mantle = new Mantle()
  mantle.loadMnemonic(mnemonicString)
  const { mnemonic, address } = mantle
  const publicKey = mantle.getPublicKey('hex0x')
  return { mantle, mnemonic, address, publicKey }
}
