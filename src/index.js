import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import config from 'store'
import registerServiceWorker from 'registerServiceWorker'
import App from 'containers/App'
import Home from 'containers/Home'
import Profile from 'containers/Profile'
import { ROUTE_URL } from 'containers/constants.js'
import 'reset.css'

const { store, history } = config

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path={ROUTE_URL.home} component={Home} />
        <Route path={ROUTE_URL.profile} component={Profile} />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
