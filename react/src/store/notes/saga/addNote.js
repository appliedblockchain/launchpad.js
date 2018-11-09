import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performEncryptNote } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS, fetchNotes } from '..'

const { ADD_NOTE, ADD_NOTE_SUCCESS, ADD_NOTE_FAIL } = ACTIONS

export function* addNote(action) {
  try {
    const mantle = yield select(state => state.auth.mantle)
    const mnemonic = yield select(state => state.auth.mnemonic)

    const { tag, text, publicKeys } = action.payload
    const encryptedNote = performEncryptNote(mantle, tag, text, publicKeys)
    const { addresses, keysHex, encryptedText, author } = encryptedNote
    const params = [ tag, encryptedText, author, addresses, keysHex ]

    yield call(fetch, `${REST_API_LOCATION}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ params, mnemonic })
    })

    yield put({
      type: ADD_NOTE_SUCCESS,
      payload: { ...encryptedNote, plainText: text }
    })
    yield put(fetchNotes())
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
