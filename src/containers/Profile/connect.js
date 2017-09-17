import { connect } from 'react-redux'
import Component from './Profile.js'

export const mapState = ({
  router
}) => ({
  pathname: (router) ? router.location.pathname : ''
})

export const mapDispatch = (/*dispatch*/) => ({})

export default connect(mapState, mapDispatch)(Component)
