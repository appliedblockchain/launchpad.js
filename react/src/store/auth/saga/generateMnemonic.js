import { all, takeLatest, put, call } from 'redux-saga/effects'
import Mantle from '@appliedblockchain/mantle'
import { performGenerateMnemonic } from './perform'
import { ACTIONS } from '../index'

const {
  GENERATE_MNEMONIC,
  GENERATE_MNEMONIC_FAIL,
  GENERATE_MNEMONIC_SUCCESS
} = ACTIONS

export function* generateMnemonic() {
  try {
    const mantle = new Mantle()
    const mnemonic = yield call(performGenerateMnemonic)
    yield put({
      type: GENERATE_MNEMONIC_SUCCESS,
      payload: {
        mantle,
        mnemonic
      }
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
