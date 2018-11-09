import { all, takeLatest, put } from 'redux-saga/effects'
import { ACTIONS, logoutSuccess, logoutClear } from '../index'

const { LOGOUT } = ACTIONS

export function* logout() {
  yield put(logoutSuccess())
  yield put(logoutClear())
}

function* watchLogout() {
  yield takeLatest(LOGOUT, logout)
}

export default function* rootSaga() {
  yield all([
    watchLogout()
  ])
}
