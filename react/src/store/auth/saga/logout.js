import { all, takeLatest, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { ACTIONS, logoutSuccess, logoutClear } from '../index'
import { ROUTE_URL } from 'constants.js'

const { LOGOUT } = ACTIONS

export function* logout() {
  yield put(logoutSuccess())
  yield put(push(ROUTE_URL.startScreen))
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
