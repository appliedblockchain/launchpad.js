import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import reducers from './reducers'
import rootSaga from './sagas'
import { loadMnemonic } from './auth'
import { NOT_AUTHENTICATED_ROUTES } from 'constants.js'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
const sagaMiddleware = createSagaMiddleware()
let composeEnhancers = compose
const middlewares = [ sagaMiddleware ]
// Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history))

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

const rehydrateCallback = () => {
  const location = store.getState().router.location.pathname
  if (!NOT_AUTHENTICATED_ROUTES.includes(location)) {
    store.dispatch(loadMnemonic('from_store'))
  }
}
export const persistor = persistStore(store, null, rehydrateCallback)
sagaMiddleware.run(rootSaga)

const config = {
  store,
  history,
  persistor
}

export default config
