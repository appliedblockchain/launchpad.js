import { connect } from 'react-redux'
import Component from './UserInfo.js'
import { logout } from 'store/auth'

export const mapState = ({ auth: { publicKey } }) => {
  return {
    publicKey
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
