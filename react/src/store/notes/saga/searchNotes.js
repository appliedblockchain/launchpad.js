import { delay } from 'redux-saga'
import { all, put, select, call, takeLatest } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS } from '..'

import { searchNotesSuccess, searchNotesFailure, setQuery } from 'store/notes'

const { SEARCH_NOTES } = ACTIONS

async function getSearchResults(query, offset = 0) {
  const url = query !== '' ? `${REST_API_LOCATION}/notes/search?query=${query}&offset=${offset}` : `${REST_API_LOCATION}/notes`

  const response = await fetch(url)

  const results = await response.json()

  return results
}

export function* performSearch (action) {
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
      previousQuery: query
    }))
  } catch (error) {
    console.error(error)
    yield put(searchNotesFailure())
  }
}

export function* searchNotes(action) {
  const { query } = action.payload
  if (query) {
    yield put(setQuery(query))
  }
  const previousQuery = yield select(state => state.notes.previousQuery)
  const partOfSameWord = !!query ? previousQuery.includes(query) || query.includes(previousQuery) : false
  if (partOfSameWord) {
    yield call(delay, 1500)
  }
  yield call(performSearch, action)
  
}
function* watchSearchNotes() {
  yield takeLatest(SEARCH_NOTES, searchNotes)
}

export default function* rootSaga() {
  yield all([ watchSearchNotes() ])
}
