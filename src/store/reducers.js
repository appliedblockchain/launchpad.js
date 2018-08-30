import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'

const reducers = combineReducers({
  router: routerReducer,
  auth
})

export default reducers
