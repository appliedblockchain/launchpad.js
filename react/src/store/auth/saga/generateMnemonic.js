import { all, takeLatest, put, call } from 'redux-saga/effects'
import { performGenerateMnemonic } from './perform'
import { ACTIONS } from '../index'

const {
  GENERATE_MNEMONIC,
  GENERATE_MNEMONIC_FAIL,
  GENERATE_MNEMONIC_SUCCESS
} = ACTIONS
export function* generateMnemonic() {
  try {
    const mnemonic = yield call(performGenerateMnemonic)
    yield put({
      type: GENERATE_MNEMONIC_SUCCESS,
      payload: mnemonic
    })
  } catch (err) {
    yield put({ type: GENERATE_MNEMONIC_FAIL })
  }
}

function* watchGenerateMnemonic() {
  yield takeLatest(GENERATE_MNEMONIC, generateMnemonic)
}

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic() ])
}
