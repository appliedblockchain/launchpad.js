import Mantle from '@appliedblockchain/mantle'
import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performEncryptNote } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS } from '..'
import contract from '../../../contracts/Notes.json'

const address = process.env.CONTRACT_ADDRESS
console.log('**********', process.env)
console.log('ADDRESS', address)

const { abi, contractName } = contract
const { ADD_NOTE, ADD_NOTE_SUCCESS, ADD_NOTE_FAIL } = ACTIONS

export function* addNote(action) {
  try {
    const mnemonic = yield select(state => state.auth.mnemonic)
    const mantle = new Mantle()
    mantle.loadMnemonic(mnemonic)
    mantle.loadContract({
      id: contractName,
      abi,
      address
    })
    console.log('MANTLE CONTRACT', mantle.contracts[contractName])

    const { tag, text, publicKeys } = action.payload
    const encryptedNote = performEncryptNote(mnemonic, tag, text, publicKeys)
    const { addresses, keysHex, encryptedText, author } = encryptedNote

    const rawTransaction = yield mantle.signTransaction({
      contractName,
      methodName: 'addNote',
      params: [ tag, encryptedText, author, addresses, keysHex ]
    })

    yield call(fetch, `${REST_API_LOCATION}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rawTransaction })
    })

    yield put({
      type: ADD_NOTE_SUCCESS,
      payload: { ...encryptedNote, plainText: text }
    })
  } catch (err) {
    yield put({
      type: ADD_NOTE_FAIL,
      payload: action.payload
    })
  }
}

function* watchAddNote() {
  yield takeLatest(ADD_NOTE, addNote)
}

export default function* rootSaga() {
  yield all([ watchAddNote() ])
}
