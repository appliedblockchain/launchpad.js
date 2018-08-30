import React, { Fragment } from 'react'
/* import PropTypes from 'prop-types' */
import Page404 from 'containers/Page404'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import { Switch, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { ROUTE_URL } from 'containers/constants.js'
import config from 'store'
import GenerateLoadHeader from 'components/GenerateLoadHeader'
import GenerateMnemonic from 'containers/GenerateMnemonic'
import LoadMnemonic from 'containers/LoadMnemonic'

/* import Header from 'components/Header'
import styles from './style.module.css' */
const { store, history } = config

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route
            exact
            path={ROUTE_URL.startScreen}
            component={GenerateLoadHeader}
          />
          <Route
            path={'/generate-mnemonic'}
            render={props => (
              <Fragment>
                <GenerateLoadHeader />
                <GenerateMnemonic {...props} />
              </Fragment>
            )}
          />
          <Route
            path={'/load-mnemonic'}
            render={props => (
              <Fragment>
                <GenerateLoadHeader />
                <LoadMnemonic {...props} />
              </Fragment>
            )}
          />
          <Route
            exact
            path={'/'}
            render={() => <Redirect to={'/generate-mnemonic'} />}
          />
          <Route component={Page404} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
)

App.propTypes = {}

export default App
