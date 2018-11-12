import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS } from '..'
const { FETCH_NOTES, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAIL } = ACTIONS

export function* fetchNotes(action) {
  try {
    const mantle = yield select(state => state.auth.mantle)
    const res = yield call(fetch, `${REST_API_LOCATION}/notes`)
    const parsedResult = yield call([ res, res.json ])
    const notes = parsedResult.result
    const decryptedNotes = performDecryptNotes(mantle, notes)

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
