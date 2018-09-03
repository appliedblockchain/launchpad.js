import BPrivacy from '@appliedblockchain/b-privacy'

const encrypt = (toEncrypt, key) => BPrivacy.encryptSymmetric(
  toEncrypt,
  BPrivacy.keccak256(Buffer.from(key, 'utf8'))
)

const decrypt = (toDecrypt, key) => BPrivacy.decryptSymmetric(
  toDecrypt,
  BPrivacy.keccak256(Buffer.from(key, 'utf8'))
)

export default {
  encrypt,
  decrypt
}
