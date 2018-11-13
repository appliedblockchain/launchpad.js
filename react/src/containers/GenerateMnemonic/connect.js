import { connect } from 'react-redux'
import { generateMnemonic, loadMnemonic } from 'store/auth'
import Component from './GenerateMnemonic.js'

const mapStateToProps = ({ auth: { mnemonic } }) => ({
  mnemonic
})

const mapDispatchToProps = dispatch => ({
  generateMnemonic: () => dispatch(generateMnemonic()),
  loadMnemonic: mnemonic => dispatch(loadMnemonic(mnemonic))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
