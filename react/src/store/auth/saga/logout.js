import { all, takeLatest, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { ACTIONS, logoutSuccess } from '../index'
import { ROUTE_URL } from 'constants.js'

const { LOGOUT } = ACTIONS

export function* logout() {
  yield put(logoutSuccess())
  yield put(push(ROUTE_URL.startScreen))
}

function* watchLogout() {
  yield takeLatest(LOGOUT, logout)
}

export default function* rootSaga() {
  yield all([
    watchLogout()
  ])
}
