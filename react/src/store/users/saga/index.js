import { all } from 'redux-saga/effects'
import watchfetchUsers from './fetchUsers'

export default function* rootSaga() {
  yield all([ watchfetchUsers() ])
}
