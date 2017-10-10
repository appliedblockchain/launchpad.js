import { all } from 'redux-saga/effects'
import profile from 'containers/Profile/saga'

export default function* rootSaga() {
  yield all([
    profile()
    // add individual saga below
    // check appii-react repo
  ])
}
