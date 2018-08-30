import { connect } from 'react-redux'
import Component from './LoadMnemonic.js'

export const mapState = ({ router }) => ({
  pathname: router ? router.location.pathname : ''
})

export const mapDispatch = (/* dispatch*/) => ({})

export default connect(
  mapState,
  mapDispatch
)(Component)
