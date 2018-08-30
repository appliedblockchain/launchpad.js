import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { ACTIONS as SAGA_WRAPPER_ACTIONS } from './sagaWrapper'
import { createLogger } from 'redux-logger'
import reducers from './reducers'
import rootSaga from './sagas'

const actionBlacklist = [ SAGA_WRAPPER_ACTIONS.SAGA_WRAPPER ]

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
let composeEnhancers = compose
const middlewares = [ sagaMiddleware ]
// Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history))

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    predicate: (_, action) => !actionBlacklist.includes(action.type),
    collapsed: true
  })
  middlewares.push(logger)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)

const config = {
  store,
  history
}

export default config
