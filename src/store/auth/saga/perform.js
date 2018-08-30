import BPrivacy from '@appliedblockchain/b-privacy'
import cryptography from 'utils/cryptography'
export const performEncryptMnemonic = userData => {
  const { mnemonic, password } = userData
  return cryptography.encrypt(mnemonic, password)
}

export const performGenerateMnemonic = () => {
  return BPrivacy.generateMnemonicPhrase()
}

export const performBuildBPrivacyObject = mnemonic => new BPrivacy({ mnemonic })
