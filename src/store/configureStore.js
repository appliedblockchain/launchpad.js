import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = []
// Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history))

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({collapsed: true})
  middlewares.push(logger)
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)

const config = {
  store,
  history
}

export default config
