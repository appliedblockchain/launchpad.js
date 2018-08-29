import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { throttle } from 'lodash'
import reducers from './reducers'
import rootSaga from './sagas'
import { loadState, saveState } from './localStorage'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
let composeEnhancers = compose
const middlewares = [ sagaMiddleware ]
// Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history))

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const percistedState = loadState()
const store = createStore(
  reducers,
  percistedState,
  composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleware.run(rootSaga)

store.subscribe(
  throttle(() => {
    saveState(
      store.getState({
        cryptomaterials: {}
      })
    )
  }, 900)
)

const config = {
  store,
  history
}

export default config
