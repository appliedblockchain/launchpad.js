import { all, takeLatest, call, put, select } from 'redux-saga/effects'
import { performLoadMnemonic } from './perform'
import { ACTIONS, loadMnemonicSuccess, loadMnemonicFail, loadMnemonicPersist } from '../index'
import sagaWrapper from 'store/sagaWrapper'

const { LOAD_MNEMONIC } = ACTIONS

export function* getMnemonic(action) {
  if (action.payload === 'from_store') {
    return yield select(state => state.auth.mnemonic)
  }
  return action.payload
}

export function* _loadMnemonic(action) {
  yield put(sagaWrapper(
    function* loadMnemonic() {
      const mnemonic = yield call(getMnemonic, action)
      if (mnemonic) {
        const authData = performLoadMnemonic(mnemonic)
        yield put(loadMnemonicSuccess(authData))
        yield put(loadMnemonicPersist())
      }
    }, {
      additionalFailFunctions: loadMnemonicFail
    }
  ))
}

function* watchLoadMnemonic() {
  yield takeLatest(LOAD_MNEMONIC, _loadMnemonic)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
