import { all, takeLatest, put, call } from 'redux-saga/effects'
import { performGenerateMnemonic } from './perform'
import { ACTIONS, generateMnemonicSuccess } from '../index'

const { GENERATE_MNEMONIC } = ACTIONS

export function* generateMnemonic() {
  try {
    const mnemonic = yield call(performGenerateMnemonic)
    yield put(generateMnemonicSuccess(mnemonic))
  } catch (error) {
    console.error(error)
  }
}

function* watchGenerateMnemonic() {
  yield takeLatest(GENERATE_MNEMONIC, generateMnemonic)
}

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic() ])
}
