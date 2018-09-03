import { connect } from 'react-redux'
import { generateMnemonic, loadMnemonic } from 'store/auth'
import Component from './GenerateMnemonic.js'

export const mapState = ({ auth: { mnemonic } }) => ({
  mnemonic
})
const mapDispatchToProps = dispatch => {
  return {
    generateMnemonic: () => dispatch(generateMnemonic()),
    loadMnemonic: mnemonic => dispatch(loadMnemonic(mnemonic))
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
