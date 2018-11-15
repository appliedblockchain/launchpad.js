import { all } from 'redux-saga/effects'
import auth from './auth/saga'
import notes from './notes/saga'
import sagaWrapper from './sagaWrapper/sagaWrapper'

export default function* rootSaga() {
  yield all([
    auth(),
    notes(),
    sagaWrapper()
  ])
}
