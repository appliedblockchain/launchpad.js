import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { ACTIONS } from '..'
const { FETCH_NOTES, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAIL } = ACTIONS

export function* fetchNotes(action) {
  try {
    const mnemonic = yield select(state => state.auth.mnemonic)
    const res = yield call(fetch, 'http://localhost:3030/notes')
    const notes = yield call([ res, res.json ])
    const decryptedNotes = performDecryptNotes(mnemonic, notes)
    yield put({
      type: FETCH_NOTES_SUCCESS,
      payload: decryptedNotes
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FETCH_NOTES_FAIL,
      payload: action.payload
    })
  }
}

function* watchFetchNotes() {
  yield takeLatest(FETCH_NOTES, fetchNotes)
}

export default function* rootSaga() {
  yield all([ watchFetchNotes() ])
}
