import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import notes from './notes'
import users from './users'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
  key: 'auth',
  storage,
  transforms: [],
  blacklist: [ 'privateKey' ]
}
const persistAuth = persistReducer(authPersistConfig, auth)
const reducers = combineReducers({
  router: routerReducer,
  auth: persistAuth,
  notes,
  users
})

export default reducers
