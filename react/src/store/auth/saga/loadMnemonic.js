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
    // Here, we use additionalFailFunctions to give additional behaviour to this wrapper in case of failure.
    // Default behaviour comes from sagaWrapper/defaultOptions. It is this:
    // failFunctions: (...args) => notifyGlobalError(...)
    // This reads as: In case of failure, notify the user of the failure.
    // Besides notifying the user about the failure, we also want to perform the loadMnemonicFail action.
    // loadMnemonicFail will log the user out.
    // The same effect can be achieved by copying sagaWrapper/default options, replacing failFunctions with an array,
    // letting the default fail function be the first element of that array, adding loadMnemonicFail as the second
    // element of that array and then adding () => true for the perform and put checks.
    // In fact, this is how additionalFailFunctions is parsed.
    }, { additionalFailFunctions: loadMnemonicFail }
  ))
}

function* watchLoadMnemonic() {
  yield takeLatest(LOAD_MNEMONIC, _loadMnemonic)
}

export default function* rootSaga() {
  yield all([ watchLoadMnemonic() ])
}
