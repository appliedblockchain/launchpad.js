import { all, takeLatest, put, select, call } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS } from '..'

import { searchNotesSuccess, searchNotesFailure } from 'store/notes'

const { SEARCH_NOTES } = ACTIONS

async function getSearchResults(query, offset = 0) {
  const url = query !== '' ? `${REST_API_LOCATION}/notes/search?query=${query}&offset=${offset}` : `${REST_API_LOCATION}/notes`

  const response = await fetch(url)

  const results = await response.json()

  return results
}

export function* searchNotes(action) {
  try {
    const query = action.payload !== null ? action.payload : yield select(state => state.notes.query)

    const mnemonic = yield select(state => state.auth.mnemonic)
    const offset = yield select(state => state.notes.offset)
    const previousQuery = yield select(state => state.notes.previousQuery)

    const nextOffset = previousQuery === query && offset ? offset : 0

    const { result, next } = yield call(getSearchResults, query, nextOffset)

    const decryptedNotes = performDecryptNotes(mnemonic, result)

    yield put(searchNotesSuccess({
      notes: decryptedNotes,
      offset: next,
      previousQuery: query,
      query: query
    }))
  } catch (err) {
    console.error(err)
    yield put(searchNotesFailure())
  }
}

function* watchSearchhNotes() {
  yield takeLatest(SEARCH_NOTES, searchNotes)
}

export default function* rootSaga() {
  yield all([ watchSearchhNotes() ])
}
