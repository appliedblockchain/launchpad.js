import { connect } from 'react-redux'
import Component from './UserInfo.js'

export const mapState = ({ auth: { publicKey } }) => {
  return {
    publicKey
  }
}
const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
