import { all, put, select, call, takeLatest, throttle } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { REST_API_LOCATION } from '../../../config'
import { ACTIONS } from '..'

import { searchNotesSuccess, searchNotesFailure, setQuery } from 'store/notes'

const { SEARCH_NOTES } = ACTIONS
const THROTTLE_QUERY = 'THROTTLE_QUERY'
const REGULAR_QUERY = 'REGULAR_QUERY'

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
    const mantle = yield select(state => state.auth.mantle)

    const useOffset = previousQuery === query && action.payload.offset !== null
    const offsetToUse = yield select(state => state.notes.offset) || 0
    const nextOffset = useOffset ? offsetToUse : 0

    const { result, next } = yield call(getSearchResults, query, nextOffset)
    const decryptedNotes = yield call(performDecryptNotes, mantle, result)

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
  if (query || query === '') {
    yield put(setQuery(query))
  }
  const previousQuery = yield select(state => state.notes.previousQuery)
  const partOfSameWord = !!query ? previousQuery.includes(query) || query.includes(previousQuery) : false
  if (partOfSameWord) {
    yield put({ type: THROTTLE_QUERY, payload: action.payload })
  } else {
    yield put({ type: REGULAR_QUERY, payload: action.payload })
  }
}
function* watchSearchNotes() {
  yield takeLatest(SEARCH_NOTES, searchNotes)
}

function* watchSearchThrottle() {
  yield throttle(500, THROTTLE_QUERY, performSearch)
}

function* watchSearchRegular() {
  yield takeLatest(REGULAR_QUERY, performSearch)
}

export default function* rootSaga() {
  yield all([
    watchSearchNotes(),
    watchSearchThrottle(),
    watchSearchRegular()
  ])
}
