import { all, takeLatest, put, select } from 'redux-saga/effects'
import { performLoadMnemonic } from './perform'
import { ACTIONS } from '../index'
const { LOAD_MNEMONIC, LOAD_MNEMONIC_SUCCESS, LOAD_MNEMONIC_PERSIST, LOAD_MNEMONIC_FAIL } = ACTIONS

export function* loadMnemonic(action) {
  let mnemonic
  if (action.payload === 'from_store') {
    mnemonic = yield select(state => state.auth.mnemonic)
  } else {
    mnemonic = action.payload
  }
  if (mnemonic) {
    try {
      const authData = performLoadMnemonic(mnemonic)
      yield put({ type: LOAD_MNEMONIC_SUCCESS, payload: authData })
      yield put({ type: LOAD_MNEMONIC_PERSIST })
    } catch (error) {
      console.error(error)
      yield put({ type: LOAD_MNEMONIC_FAIL })
    }
  }
}

function* watchLoadMnemonic() {
  yield takeLatest(LOAD_MNEMONIC, loadMnemonic)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
