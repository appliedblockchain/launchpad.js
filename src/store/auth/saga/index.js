import { all } from 'redux-saga/effects'
import watchGenerateMnemonic from './generateMnemonic'

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic() ])
}
