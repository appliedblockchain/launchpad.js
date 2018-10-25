import { all, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS } from '../index'
const { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } = ACTIONS

export function* logout(action) {
  try {
    yield put({
      type: LOGOUT_SUCCESS
    })
  } catch (err) {
    yield put({
      type: LOGOUT_FAIL,
      payload: action.payload
    })
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT, logout)
}

export default function* rootSaga() {
  yield all([ watchLogout() ])
}
