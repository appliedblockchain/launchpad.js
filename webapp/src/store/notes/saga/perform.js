import Mantle from '@appliedblockchain/mantle'
import BPrivacy from '@appliedblockchain/b-privacy'
const { bufferToHex0x } = Mantle.utils

export const performEncryptNote = (mnemonic, tag, text, publicKeys) => {
  const mantle = new Mantle()
  mantle.loadMnemonic(mnemonic)

  const symmetricKey = Mantle.createSymmetricKey()
  const encryptedNote = Mantle.encryptSymmetric(text, symmetricKey)
  const encryptedKey = Mantle.encrypt(bufferToHex0x(symmetricKey), mantle.publicKey)

  const credentials = {
    [mantle.address]: {
      address: mantle.address,
      encSymKey: bufferToHex0x(encryptedKey)
    }
  }

  for (let i = 0; i < publicKeys.length; ++i) {
    const publicKey = publicKeys[i]
    const encSymKey = Mantle.encrypt(bufferToHex0x(symmetricKey), publicKey)

    const address = BPrivacy.publicKeyToAddress(publicKey)
    credentials[address] = {
      address: address,
      encSymKey: bufferToHex0x(encSymKey)
    }
  }

  return {
    tag,
    author: mantle.address,
    credentials,
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

export const performDecryptNotes = (mnemonic, notes) => {
  return notes.map(note => {
    return performDecryptNote(mnemonic, note)
  })
}
