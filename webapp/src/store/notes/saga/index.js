import { all } from 'redux-saga/effects'
import watchAddNote from './addNote'
import watchFetchNotes from './fetchNotes'

export default function* rootSaga() {
  yield all([ watchAddNote(), watchFetchNotes() ])
}
