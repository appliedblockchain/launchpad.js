import { delay } from 'redux-saga'
import { takeEvery, put, all } from 'redux-saga/effects'

export function* helloSaga() {
  yield delay(100)
  console.log('Hello Recover Sagas!') // eslint-disable-line
}

export function* fetch() {
  // This is an example.
  // Dont use a string for action - but import from reducer
  // see appii-react repo for better example
  yield put({ type: 'LOAD_SUCCESS' })
}

export function* watchFetch() {
  // This is an example.
  // Dont use a string for action - but import from reducer
  // see appii-react repo for better example
  yield takeEvery('FETCH_PROFILE', fetch)
}

export default function* rootSaga() {
  yield all([ helloSaga(), watchFetch() ])
}
