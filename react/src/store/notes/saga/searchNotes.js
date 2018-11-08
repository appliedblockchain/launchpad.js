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
    const query = action.payload.query === null ? yield select(state => state.notes.query) : action.payload.query
    const previousQuery = yield select(state => state.notes.previousQuery)
    const mnemonic = yield select(state => state.auth.mnemonic)

    const useOffset = previousQuery === query && action.payload.offset !== null
    const offsetToUse = yield select(state => state.notes.offset) || 0
    const nextOffset = useOffset ? offsetToUse : 0

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
