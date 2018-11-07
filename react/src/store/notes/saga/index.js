import { all } from 'redux-saga/effects'
import watchAddNote from './addNote'
import watchFetchNotes from './fetchNotes'
import searchNotes from './searchNotes'

export default function* rootSaga() {
  yield all([
    watchAddNote(),
    watchFetchNotes(),
    searchNotes()
  ])
}
