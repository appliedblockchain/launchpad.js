import { all } from 'redux-saga/effects'
import watchGenerateMnemonic from './generateMnemonic'
import watchLoadMnemonic from './loadMnemonic'
import watchLogout from './logout'

export default function* rootSaga() {
  yield all([ watchGenerateMnemonic(), watchLoadMnemonic(), watchLogout() ])
}
