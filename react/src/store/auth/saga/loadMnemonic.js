import { all, takeLatest, put, select } from 'redux-saga/effects'
import { performLoadMnemonic } from './perform'
import { ACTIONS, loadMnemonicSuccess, loadMnemonicFail, loadMnemonicPersist } from '../index'
import sagaWrapper from 'store/sagaWrapper'

const { LOAD_MNEMONIC } = ACTIONS

export function* _loadMnemonic(action) {
  yield put(sagaWrapper(
    function* loadMnemonic() {
      let mnemonic
      if (action.payload === 'from_store') {
        mnemonic = yield select(state => state.auth.mnemonic)
      } else {
        mnemonic = action.payload
      }
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
