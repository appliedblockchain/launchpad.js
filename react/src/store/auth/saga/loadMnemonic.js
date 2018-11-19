import { all, takeLatest, put, select } from 'redux-saga/effects'
import { performLoadMnemonic } from './perform'
import { ACTIONS, loadMnemonicSuccess, loadMnemonicFail, loadMnemonicPersist } from '../index'

const { LOAD_MNEMONIC } = ACTIONS

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
      yield put(loadMnemonicSuccess(authData))
      yield put(loadMnemonicPersist())
    } catch (error) {
      console.error(error)
      yield put(loadMnemonicFail())
    }
  }
}

function* watchLoadMnemonic() {
  yield takeLatest(LOAD_MNEMONIC, loadMnemonic)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
