import React, { Fragment } from 'react'
/* import PropTypes from 'prop-types' */
import StartScreen from 'containers/StartScreen'
import Page404 from 'containers/StartScreen'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import { Switch } from 'react-router-dom'
import Profile from 'containers/Profile'
import LoadMnemonic from 'containers/LoadMnemonic'
import GenerateMnemonic from 'containers/GenerateMnemonic'
import { ROUTE_URL } from 'containers/constants.js'
import config from 'store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

/* import Header from 'components/Header'
import styles from './style.module.css' */
const { store, history } = config

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={ROUTE_URL.startScreen} component={StartScreen} />
          <Route
            path={ROUTE_URL.profile}
            render={props => (
              <Fragment>
                <Profile {...props} />
              </Fragment>
            )}
          />
          <Route
            path={'/generate-mnemonic'}
            render={props => (
              <Fragment>
                <GenerateMnemonic {...props} />
              </Fragment>
            )}
          />
          <Route
            path={'/load-mnemonic'}
            render={props => (
              <Fragment>
                <LoadMnemonic {...props} />
              </Fragment>
            )}
          />
          <Route component={Page404} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>
)

App.propTypes = {}

export default App
