import { connect } from 'react-redux'
import Component from './App.js'

export const mapState = ({ app, auth: { authenticated } }) => ({
  app,
  authenticated
})
const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
