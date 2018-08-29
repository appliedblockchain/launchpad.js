import { connect } from 'react-redux'

import Component from './Create.js'
import { create } from 'store/actions'

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => {
  return {
    onCreate: () => dispatch(create())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)
