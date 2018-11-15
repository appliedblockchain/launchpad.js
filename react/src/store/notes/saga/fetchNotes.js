import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS, fetchNotesSuccess } from '../index'

const { FETCH_NOTES } = ACTIONS

export function* fetchNotes() {
  try {
    const mantle = yield select(state => state.auth.mantle)
    const res = yield call(fetch, `${REST_API_LOCATION}/notes`)
    const parsedResult = yield call([ res, res.json ])
    const notes = parsedResult.result
    const decryptedNotes = performDecryptNotes(mantle, notes)

    yield put(fetchNotesSuccess(decryptedNotes))
  } catch (error) {
    console.error(error)
  }
}

function* watchFetchNotes() {
  yield takeLatest(FETCH_NOTES, fetchNotes)
}

export default function* rootSaga() {
  yield all([ watchFetchNotes() ])
}
