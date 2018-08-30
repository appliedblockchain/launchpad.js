import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import asyncValidate from './asyncValidate'
import styles from './style.module.css'

class GenerateMnemonic extends Component {
  componentDidMount() {
    const { generateMnemonic } = this.props
    generateMnemonic()
  }
  render() {
    const { mnemonic } = this.props
    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        mnemonic is {mnemonic}
      </form>
    )
  }
}

GenerateMnemonic.propTypes = {
  generateMnemonic: PropTypes.func.isRequired,
  mnemonic: PropTypes.string.isRequired
}
export default GenerateMnemonic
