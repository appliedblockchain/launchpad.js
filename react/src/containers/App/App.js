import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Redirect } from 'react-router-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import StartScreen from 'containers/StartScreen'
import Page404 from 'containers/Page404'
import GenerateMnemonic from 'containers/GenerateMnemonic'
import LoadMnemonic from 'containers/LoadMnemonic'
import NotesAdd from 'containers/NotesAdd'
import NotesList from 'containers/NotesList'
import NotesSearch from 'containers/NotesSearch'
import UserInfo from 'containers/UserInfo'
import HeaderBack from 'components/HeaderBack'
import config from 'store'
import { ROUTE_URL } from 'constants.js'

const { history, persistor } = config

const renderNotes = () => (
  <Fragment>
    <UserInfo />
    <NotesAdd />
    <NotesSearch />
    <NotesList />
  </Fragment>
)

const renderGenerateMnemonic = props => (
  <Fragment>
    <HeaderBack />
    <GenerateMnemonic {...props} />
  </Fragment>
)

const renderLoadMnemonic = props => (
  <Fragment>
    <HeaderBack />
    <LoadMnemonic {...props} />
  </Fragment>
)

const NotAuthenticatedRoutes = () => (
  <Switch>
    <Route exact path={ROUTE_URL.startScreen} render={() => <StartScreen />} />
    <Route path={ROUTE_URL.generateMnemonic} render={renderGenerateMnemonic} />
    <Route path={ROUTE_URL.loadMnemonic} render={renderLoadMnemonic} />
    <Route render={() => <Redirect to={ROUTE_URL.generateMnemonic} />} />
    <Route render={() => <Page404 />} />
  </Switch>
)

const AuthenticatedRoutes = () => (
  <Switch>
    <Route path={ROUTE_URL.notes} render={renderNotes} />
    <Route render={() => <Redirect to={ROUTE_URL.notes} />} />
    <Route render={() => <Page404 />} />
  </Switch>
)

class App extends Component {
  renderAvailableRoutes = () => {
    const { authenticated } = this.props
    return authenticated ? <AuthenticatedRoutes /> : <NotAuthenticatedRoutes />
  }

  renderLoading = () => <div>Loading</div>

  render() {
    return (
      <PersistGate loading={this.renderLoading()} persistor={persistor}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <ConnectedRouter history={history}>
            { this.renderAvailableRoutes() }
          </ConnectedRouter>
        </MuiThemeProvider>
      </PersistGate>
    )
  }
}

App.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default App
