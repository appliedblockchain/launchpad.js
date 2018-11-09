import { connect } from 'react-redux'
import Component from './App.js'

const mapStateToProps = state => ({
  app: state.app,
  authenticated: state.auth.authenticated
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
