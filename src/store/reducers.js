import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { CREATE } from './constants'

const cryptomaterials = (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return [ ...state ]
    default:
      return state
  }
}

const reducers = combineReducers({
  // add individual reducer below
  // anotherReducer: anotherReducer,
  cryptomaterials,
  router: routerReducer
})

export default reducers
