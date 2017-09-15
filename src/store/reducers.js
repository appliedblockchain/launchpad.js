import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  // add individual reducer below
  // anotherReducer: anotherReducer,
  router: routerReducer
})

export default reducers
