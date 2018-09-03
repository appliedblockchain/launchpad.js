import { all, takeLatest, put } from 'redux-saga/effects'
import { performLoadMnemonic } from './perform'
import { ACTIONS } from '../index'
const { LOAD_MNEMONIC, LOAD_MNEMONIC_SUCCESS, LOAD_MNEMONIC_FAIL } = ACTIONS

export function* loadMnemonic(action) {
  try {
    const authData = performLoadMnemonic(action.payload)
    yield put({
      type: LOAD_MNEMONIC_SUCCESS,
      payload: authData
    })
  } catch (err) {
    yield put({
      type: LOAD_MNEMONIC_FAIL,
      payload: action.payload
    })
  }
}

function* watchLoadMnemonic() {
  yield takeLatest(LOAD_MNEMONIC, loadMnemonic)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
