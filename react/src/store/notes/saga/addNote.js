import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performEncryptNote } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS, fetchNotes } from '..'

const { ADD_NOTE, ADD_NOTE_SUCCESS, ADD_NOTE_FAIL } = ACTIONS

export function* addNote(action) {
  try {
    const mantle = yield select(state => state.auth.mantle)

    const { tag, text, publicKeys } = action.payload
    const encryptedNote = performEncryptNote(mantle, tag, text, publicKeys)
    const { addresses, keysHex, encryptedText, author } = encryptedNote
    const params = [ tag, encryptedText, author, addresses, keysHex ]

    let contract = yield select(state => state.notes.contract)

    if (!contract.loaded) {
      const response = yield call(fetch, `${REST_API_LOCATION}/notesContract`)

      contract = yield response.json()
      contract.loaded = true
      mantle.loadContract(contract)
    }

    const rawTransaction = yield mantle.signTransaction({
      params: params,
      contractName: 'Notes',
      methodName: 'addNote'
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
      payload: {
        note: { ...encryptedNote, plainText: text },
        contract
      }
    })
    yield put(fetchNotes())
  } catch (err) {
    console.error(err)
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
