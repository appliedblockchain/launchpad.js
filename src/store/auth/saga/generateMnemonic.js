import { all, takeLatest, put, call } from 'redux-saga/effects'
import { performGenerateMnemonic } from './perform'
import { ACTIONS as SAGA_WRAPPER_ACTIONS } from 'store/sagaWrapper'
import { ACTIONS, generateMnemonicSuccess } from '../index'

export function* generateMnemonic() {
  const { GENERATE_MNEMONIC_FAIL } = ACTIONS
  // console.log('here', 'here')
  yield put({
    type: SAGA_WRAPPER_ACTIONS.SAGA_WRAPPER,
    payload: {
      saga: function* saga() {
        const mnemonic = yield call(performGenerateMnemonic)
        yield put(generateMnemonicSuccess(mnemonic))
      },
      failAction: GENERATE_MNEMONIC_FAIL
    }
  })
}

function* watchGenerateMnemonic() {
  const { GENERATE_MNEMONIC } = ACTIONS
  yield takeLatest(GENERATE_MNEMONIC, generateMnemonic)
}

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic() ])
}
