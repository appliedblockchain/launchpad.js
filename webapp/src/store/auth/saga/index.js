import { all } from 'redux-saga/effects'
import watchGenerateMnemonic from './generateMnemonic'
import watchLoadMnemonic from './loadMnemonic'

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic(), watchLoadMnemonic() ])
}
