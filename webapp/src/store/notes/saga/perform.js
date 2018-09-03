import BPrivacy from '@appliedblockchain/b-privacy'

export const performEncryptNote = (mnemonic, tag, text, publicKeys) => {
  const thisUser = new BPrivacy({ mnemonic })

  const [ sharedBlob, thisUserSymetricKey ] = thisUser.encryptShared(text)

  const credentials = {
    [thisUser.publicKey.toString('hex')]: {
      publicKey: thisUser.publicKey.toString('hex'),
      sharedSyncKey: thisUserSymetricKey.toString('hex')
    }
  }
  for (const publicKey of publicKeys) {
    const currentUserSymetricKey = thisUser.shareSecret(
      thisUserSymetricKey,
      Buffer.from(publicKey, 'hex')
    )
    credentials[publicKey] = {
      publicKey,
      sharedSyncKey: currentUserSymetricKey.toString('hex')
    }
  }
  return {
    tag,
    autor: thisUser.publicKey.toString('hex'),
    credentials,
    encryptedText: sharedBlob.toString('hex')
  }
}

export const performDecryptNote = (mnemonic, note) => {
  const thisUser = new BPrivacy({ mnemonic })
  const { credentials, encryptedText } = note
  if (!credentials[thisUser.publicKey.toString('hex')]) {
    return note
  }
  const { sharedSyncKey } = credentials[thisUser.publicKey.toString('hex')]
  const plainText = thisUser.decryptShared(encryptedText, sharedSyncKey)

  return { ...note, plainText }
}

export const performDecryptNotes = (mnemonic, notes) => {
  return notes.map(note => {
    return performDecryptNote(mnemonic, note)
  })
}
