import { all, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from '..'
const { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } = ACTIONS

export function* gerUsers(action) {
  try {
    yield put({
      type: FETCH_USERS_SUCCESS,
      payload: []
    })
  } catch (err) {
    yield put({
      type: FETCH_USERS_FAIL,
      payload: action.payload
    })
  }
}

function* watchLoadMnemonic() {
  yield takeLatest(FETCH_USERS, gerUsers)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
