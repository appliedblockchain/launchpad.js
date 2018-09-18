import BPrivacy from '@appliedblockchain/b-privacy'
import cryptography from 'utils/cryptography'

export const performEncryptMnemonic = userData => {
  const { mnemonic, password } = userData
  return cryptography.encrypt(mnemonic, password)
}

export const performGenerateMnemonic = () => {
  return BPrivacy.generateMnemonicPhrase()
}

export const performLoadMnemonic = mnemonicString => {
  const { mnemonic, address, publicKey: publicKeyBuffer } = new BPrivacy({
    mnemonic: mnemonicString
  })
  const publicKey = `0x${publicKeyBuffer.toString('hex')}`
  return { mnemonic, address, publicKey }
}
