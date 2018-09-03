import { connect } from 'react-redux'
import Component from './App.js'

export const mapState = ({ app, auth: { isAuthenteticated } }) => ({
  app,
  isAuthenteticated
})
const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
