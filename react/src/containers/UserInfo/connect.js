import { connect } from 'react-redux'
import Component from './UserInfo.js'
import { logout } from 'store/auth'

const mapState = ({ auth: { publicKey } }) => {
  return {
    publicKey
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
