import { connect } from 'react-redux'
import Component from './UserInfo.js'
import { logout } from 'store/auth'

const mapStateToProps = ({ auth: { publicKey } }) => ({
  publicKey
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
