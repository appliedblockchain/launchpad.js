import Mantle from '@appliedblockchain/mantle'
import { utils } from 'web3'

const { bufferToHex0x, publicKeyToAddress } = Mantle.utils

export const performEncryptNote = (mnemonic, tag, text, publicKeys) => {
  const author = new Mantle()
  author.loadMnemonic(mnemonic)

  const symmetricKey = Mantle.createSymmetricKey()
  const encryptedNote = Mantle.encryptSymmetric(text, symmetricKey)
  const encryptedSymmetricKey = Mantle.encrypt(symmetricKey, author.publicKey)

  const credentials = {
    [author.address]: {
      address: author.address,
      encSymKey: bufferToHex0x(encryptedSymmetricKey)
    }
  }

  for (let i = 0; i < publicKeys.length; ++i) {
    const publicKey = publicKeys[i]
    const encryptedSymmetricKey = Mantle.encrypt(symmetricKey, publicKey)

    const address = publicKeyToAddress(publicKey)
    credentials[address] = {
      address,
      encSymKey: bufferToHex0x(encryptedSymmetricKey)
    }
  }

  const { addresses, keysHex } = buildAddressesAndKeys(credentials)

  return {
    addresses,
    keysHex,
    credentials,
    tag,
    author: author.address,
    encryptedText: encryptedNote.toString('hex')
  }
}

export const performDecryptNote = (mnemonic, note) => {
  const mantle = new Mantle()
  mantle.loadMnemonic(mnemonic)

  const { credentials, encryptedText } = note
  if (!credentials[mantle.address]) {
    return note
  }

  const { encSymKey } = credentials[mantle.address]
  const decryptedKey = mantle.decrypt(encSymKey)
  const plainText = Mantle.decryptSymmetric(encryptedText, decryptedKey)

  return { ...note, plainText }
}

export const performDecryptNotes = (mnemonic, notes) => (
  notes.map(note => performDecryptNote(mnemonic, note))
)

function buildAddressesAndKeys (credentials) {
  const addresses = []
  let keys = []

  for (const key in credentials) {
    const { address, encSymKey } = credentials[key]
    addresses.push(address)
    keys = [ ...keys, ...utils.hexToBytes(encSymKey) ]
  }

  return { addresses, keysHex: utils.bytesToHex(keys) }
}