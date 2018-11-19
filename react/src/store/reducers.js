import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './auth'
import notes from './notes'
import users from './users'
import authTransform from './auth/transform'

const authPersistConfig = {
  key: 'auth',
  storage,
  transforms: [ authTransform ],
  blacklist: [ 'authenticated', 'privateKey', 'mantle' ]
}
const persistAuth = persistReducer(authPersistConfig, auth)
const reducers = combineReducers({
  router: routerReducer,
  auth: persistAuth,
  notes,
  users
})

export default reducers
