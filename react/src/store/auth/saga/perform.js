import Mantle from '@appliedblockchain/mantle-core'
import cryptography from 'utils/cryptography'
import { REST_API_LOCATION } from '../../../config'

export const performEncryptMnemonic = userData => {
  const { mnemonic, password } = userData
  return cryptography.encrypt(mnemonic, password)
}

export const performGenerateMnemonic = () => {
  return Mantle.generateMnemonic()
}

export const performLoadMnemonic = mnemonicString => {
  const mantle = new Mantle({ proxyURL: REST_API_LOCATION })
  mantle.loadMnemonic(mnemonicString)
  const { mnemonic, address } = mantle
  const publicKey = mantle.getPublicKey('hex0x')
  return { mantle, mnemonic, address, publicKey }
}
