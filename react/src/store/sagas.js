import { all } from 'redux-saga/effects'
import auth from './auth/saga'
import notes from './notes/saga'

export default function* rootSaga() {
  yield all([ auth(), notes() ])
}
