import { connect } from 'react-redux'
import { loadMnemonic } from 'store/auth'
import Component from './LoadMnemonic.js'

const mapState = ({ app, auth: { mnemonic } }) => ({
  app,
  mnemonic
})

const mapDispatchToProps = dispatch => {
  return {
    loadMnemonic: mnemonic => dispatch(loadMnemonic(mnemonic))
  }
}

export default connect(
  mapState,
  mapDispatchToProps
)(Component)
