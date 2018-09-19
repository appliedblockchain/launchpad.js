import React, { Fragment } from 'react'
/* import PropTypes from 'prop-types' */
import Page404 from 'containers/Page404'
import { PersistGate } from 'redux-persist/es/integration/react'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import { Switch, Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import config from 'store'
import PropTypes from 'prop-types'
// app modules
import { ROUTE_URL } from 'containers/constants.js'
import StartScreen from 'containers/StartScreen'
import GenerateMnemonic from 'containers/GenerateMnemonic'
import LoadMnemonic from 'containers/LoadMnemonic'
import NotesAdd from 'containers/NotesAdd'
import NotesList from 'containers/NotesList'
import UserInfo from 'containers/UserInfo'
import HeaderBack from 'components/HeaderBack'

const { history, persistor } = config
const NotAuthenticatedRoutes = () => (
  <Switch>
    <Route exact path={ROUTE_URL.startScreen} component={StartScreen} />
    <Route
      path={'/generate-mnemonic'}
      render={props => (
        <Fragment>
          <HeaderBack />
          <GenerateMnemonic {...props} />
        </Fragment>
      )}
    />
    <Route
      path={'/load-mnemonic'}
      render={props => (
        <Fragment>
          <HeaderBack />
          <LoadMnemonic {...props} />
        </Fragment>
      )}
    />
    <Route render={() => <Redirect to={'/generate-mnemonic'} />} />

    <Route component={Page404} />
  </Switch>
)

const AuthenticatedRoutes = () => (
  <Switch>
    <Route
      path={'/notes/new'}
      render={() => (
        <Fragment>
          <UserInfo />
          <NotesAdd />
        </Fragment>
      )}
    />
    <Route
      path={'/notes'}
      render={() => (
        <Fragment>
          <UserInfo />
          <NotesAdd />
          <NotesList />
        </Fragment>
      )}
    />
    <Route render={() => <Redirect to={'/notes'} />} />
    <Route component={Page404} />
  </Switch>
)

const App = ({ isAuthenteticated }) => {
  return (
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <ConnectedRouter history={history}>
          {isAuthenteticated ? (
            <AuthenticatedRoutes />
          ) : (
            <NotAuthenticatedRoutes />
          )}
        </ConnectedRouter>
      </MuiThemeProvider>
    </PersistGate>
  )
}

App.propTypes = {
  isAuthenteticated: PropTypes.bool.isRequired
}

export default App
