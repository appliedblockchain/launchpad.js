import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import config from 'store'
import 'index.css'
import registerServiceWorker from 'registerServiceWorker'
import App from 'containers/App'
import Home from 'containers/Home'
import Profile from 'containers/Profile'

const { store, history } = config

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
