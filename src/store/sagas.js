import { all } from 'redux-saga/effects'
import auth from './auth/saga'
import sagaWrapper from 'store/sagaWrapper'

export default function* rootSaga() {
  yield all([ auth(), sagaWrapper() ])
}
