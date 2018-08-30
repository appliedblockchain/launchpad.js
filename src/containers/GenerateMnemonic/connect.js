import { connect } from 'react-redux'
import { generateMnemonic } from 'store/auth'
import Component from './GenerateMnemonic.js'

export const mapState = ({ app, auth }) => ({
  app,
  mnemonic: auth.mnemonic
})
const mapDispatchToProps = dispatch => {
  return {
    generateMnemonic: () => dispatch(generateMnemonic())
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
