import Mantle from '@appliedblockchain/mantle-core'
import { all, put, select, call, takeLatest, throttle } from 'redux-saga/effects'
import { performDecryptNotes } from './perform'
import { ACTIONS } from '../index'
import { REST_API_LOCATION } from 'config'
import { searchNotesSuccess, searchNotesFailure, setQuery } from 'store/notes'
import sagaWrapper from 'store/sagaWrapper'

const { SEARCH_NOTES } = ACTIONS
const THROTTLE_QUERY = 'THROTTLE_QUERY'
const REGULAR_QUERY = 'REGULAR_QUERY'

async function getSearchResults(query, offset = 0, sig) {
  const url = query !== ''
    ? `${REST_API_LOCATION}/notes/search?query=${query}&sig=${sig}&offset=${offset}`
    : `${REST_API_LOCATION}/notes`

  const response = await fetch(url)

  const results = await response.json()

  return results
}

export function* _performSearch (action) {
  yield put(sagaWrapper(
    function* performSearch() {
      const query = action.payload.query === null ? yield select(state => state.notes.query) : action.payload.query
      const previousQuery = yield select(state => state.notes.previousQuery)
      const mantle = yield select(state => state.auth.mantle)

      const useOffset = previousQuery === query && ![ null, undefined ].includes(action.payload.offset)
      const offsetToUse = yield select(state => state.notes.offset) || 0
      const nextOffset = useOffset ? offsetToUse : 0

      const sig = Mantle.sign(query, mantle.privateKey)
      const { result, next } = yield call(getSearchResults, query, nextOffset, sig)
      const decryptedNotes = yield call(performDecryptNotes, mantle, result)

      yield put(searchNotesSuccess({
        notes: decryptedNotes,
        offset: next,
        previousQuery: query
      }))
    }, { additionalFailFunctions: searchNotesFailure }
  ))
}

export function* searchNotes(action) {
  const { query } = action.payload
  if (query || query === '') {
    yield put(setQuery(query))
  }
  const previousQuery = yield select(state => state.notes.previousQuery)
  const partOfSameWord = query ? previousQuery.includes(query) || query.includes(previousQuery) : false
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
  yield throttle(500, THROTTLE_QUERY, _performSearch)
}

function* watchSearchRegular() {
  yield takeLatest(REGULAR_QUERY, _performSearch)
}

export default function* rootSaga() {
  yield all([
    watchSearchNotes(),
    watchSearchThrottle(),
    watchSearchRegular()
  ])
}
