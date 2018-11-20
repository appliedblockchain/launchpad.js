import { all, takeLatest, put, call } from 'redux-saga/effects'
import { performGenerateMnemonic } from './perform'
import { ACTIONS, generateMnemonicSuccess } from '../index'
import sagaWrapper from 'store/sagaWrapper'

const { GENERATE_MNEMONIC } = ACTIONS

export function* _generateMnemonic() {
  yield put(sagaWrapper(
    function* generateMnemonic() {
      const mnemonic = yield call(performGenerateMnemonic)
      yield put(generateMnemonicSuccess(mnemonic))
    })
  )
}

function* watchGenerateMnemonic() {
  yield takeLatest(GENERATE_MNEMONIC, _generateMnemonic)
}

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic() ])
}
