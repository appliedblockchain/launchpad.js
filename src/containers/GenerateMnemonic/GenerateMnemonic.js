import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl
} from '@material-ui/core'

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
        <div className={styles.mnemonic}>{mnemonic}</div>
        <FormControl required error={true}>
          <FormLabel component="legend" />
          <FormControlLabel
            required
            control={<Checkbox value="check" color="primary" />}
            label="I have written the recovery words"
          />
        </FormControl>
        <Button
          onClick={this.props.generateMnemonic}
          variant="outlined"
          color="primary"
        >
          Proceed
        </Button>

        <Button
          onClick={this.props.generateMnemonic}
          variant="outlined"
          color="primary"
          className={styles.regenerate}
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
