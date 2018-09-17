import BPrivacy from '@appliedblockchain/b-privacy'

export const performEncryptNote = (mnemonic, tag, text, publicKeys) => {
  const thisUser = new BPrivacy({ mnemonic })

  const [ sharedBlob, thisUserSymetricKey ] = thisUser.encryptShared(text)

  const credentials = {
    [thisUser.publicKey.toString('hex')]: {
      address: thisUser.address,
      encSymKey: `0x${thisUserSymetricKey.toString('hex')}`
    }
  }
  for (const publicKey of publicKeys) {
    const currentUserSymetricKey = thisUser.shareSecret(
      thisUserSymetricKey,
      Buffer.from(publicKey, 'hex')
    )
    credentials[thisUser.address] = {
      address: thisUser.address,
      encSymKey: `0x${currentUserSymetricKey.toString('hex')}`
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
  const plainText = thisUser.decryptShared(encryptedText, encSymKey.slice(2))

  return { ...note, plainText }
}

export const performDecryptNotes = (mnemonic, notes) => {
  return notes.map(note => {
    return performDecryptNote(mnemonic, note)
  })
}
