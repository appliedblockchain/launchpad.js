import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS, fetchNotesSuccess } from '../index'
import sagaWrapper from 'store/sagaWrapper'

const { FETCH_NOTES } = ACTIONS

export function* _fetchNotes() {
  yield put(sagaWrapper(
    function* fetchNotes() {
      const mantle = yield select(state => state.auth.mantle)
      const res = yield call(fetch, `${REST_API_LOCATION}/notes`)
      const parsedResult = yield call([ res, res.json ])
      const notes = parsedResult.result
      const decryptedNotes = performDecryptNotes(mantle, notes)
      yield put(fetchNotesSuccess(decryptedNotes))
    }
  ))
}

function* watchFetchNotes() {
  yield takeLatest(FETCH_NOTES, _fetchNotes)
}

export default function* rootSaga() {
  yield all([ watchFetchNotes() ])
}
