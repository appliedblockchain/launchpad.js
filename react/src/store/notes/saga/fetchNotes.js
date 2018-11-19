import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS, fetchNotesSuccess } from '../index'
import sagaWrapper from 'store/sagaWrapper'

const { FETCH_NOTES } = ACTIONS

const parseResponse = async response => {
  const jsonClone = response.clone()
  const textClone = response.clone()
  try {
    return await jsonClone.json()
  } catch (error) {
    const text = await textClone.text()
    if (text === 'Not Found') {
      const resource = response.url.slice(REST_API_LOCATION.length + 1)
      throw new Error(`No resource of type "${resource}" found.`)
    } else {
      throw error
    }
  }
}

export function* _fetchNotes() {
  yield put(sagaWrapper(
    function* fetchNotes() {
      const mantle = yield select(state => state.auth.mantle)
      const response = yield call(fetch, `${REST_API_LOCATION}/notes`)
      const parsedResponse = yield call(parseResponse, response)
      const notes = parsedResponse.result
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
