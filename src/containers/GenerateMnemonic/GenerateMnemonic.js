import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

import styles from './style.module.css'

class GenerateMnemonic extends Component {
  componentDidMount() {
    const { generateMnemonic } = this.props
    generateMnemonic()
  }
  render() {
    const { mnemonic } = this.props
    return (
      <div className={styles.container}>
        <div>{mnemonic}</div>
        <Button
          onClick={this.props.generateMnemonic}
          variant="outlined"
          color="primary"
        >
          REGENERATE
        </Button>
      </div>
    )
  }
}

GenerateMnemonic.propTypes = {
  generateMnemonic: PropTypes.func.isRequired,
  mnemonic: PropTypes.string.isRequired
}
export default GenerateMnemonic
