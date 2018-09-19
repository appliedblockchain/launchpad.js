import BPrivacy from '@appliedblockchain/b-privacy'

export const performEncryptNote = (mnemonic, tag, text, publicKeys) => {
  const thisUser = new BPrivacy({ mnemonic })

  const [ sharedBlob, thisUserSymmetricKey ] = thisUser.encryptShared(text)

  const credentials = {
    [thisUser.address]: {
      address: thisUser.address,
      encSymKey: `0x${thisUserSymmetricKey.toString('hex')}`
    }
  }

  for (let i = 0; i < publicKeys.length; ++i) {
    const publicKey = publicKeys[i]
    const currentUserSymmetricKey = thisUser.shareSecret(
      thisUserSymmetricKey,
      Buffer.from(publicKey.slice(2), 'hex')
    )
    const address = BPrivacy.publicKeyToAddress(publicKey)
    credentials[address] = {
      address: address,
      encSymKey: `0x${currentUserSymmetricKey.toString('hex')}`
    }
  }
  return {
    tag,
    author: thisUser.address,
    credentials,
    encryptedText: sharedBlob.toString('hex')
  }
}

export const performDecryptNote = (mnemonic, note) => {
  const thisUser = new BPrivacy({ mnemonic })
  const { credentials, encryptedText } = note
  if (!credentials[thisUser.address]) {
    return note
  }
  const { encSymKey } = credentials[thisUser.address]
  const plainText = thisUser.decryptShared(encryptedText, encSymKey)

  return { ...note, plainText }
}

export const performDecryptNotes = (mnemonic, notes) => {
  return notes.map(note => {
    return performDecryptNote(mnemonic, note)
  })
}
