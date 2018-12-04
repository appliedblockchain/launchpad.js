import Mantle from '@appliedblockchain/mantle-core'

const keccak256 = new Mantle.Web3().utils.keccak256

const encrypt = (toEncrypt, key) => Mantle.encryptSymmetric(
  toEncrypt,
  keccak256(Buffer.from(key, 'utf8'))
)

const decrypt = (toDecrypt, key) => Mantle.decryptSymmetric(
  toDecrypt,
  keccak256(Buffer.from(key, 'utf8'))
)

export default {
  encrypt,
  decrypt
}
