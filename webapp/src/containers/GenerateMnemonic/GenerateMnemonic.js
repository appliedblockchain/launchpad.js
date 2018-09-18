import React, { Component, Fragment } from 'react'
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
  state = {
    isChecked: false,
    isErrorRequiredCheckMnemonic: false
  }

  componentDidMount() {
    const { generateMnemonic } = this.props
    generateMnemonic()
  }

  onProceed = ev => {
    ev.preventDefault()
    if (!this.state.isChecked) {
      this.setState(state => ({
        isErrorRequiredCheckMnemonic: true
      }))
      return
    }
    const { mnemonic, loadMnemonic } = this.props
    loadMnemonic(mnemonic)
  }

  onCheckbox = () => {
    this.setState(state => ({
      isChecked: !state.isChecked,
      isErrorRequiredCheckMnemonic: false
    }))
  }

  render() {
    const { mnemonic } = this.props

    return (
      <form onSubmit={this.onProceed} className={styles.container}>
        <div className={styles.mnemonic}>{mnemonic}</div>
        <FormControl required>
          <FormControlLabel
            labelPlacement="end"
            control={
              <Fragment>
                <Checkbox
                  color="primary"
                  name="checkbox"
                  onChange={this.onCheckbox}
                />
                <FormLabel
                  error={this.state.isErrorRequiredCheckMnemonic}
                  component="legend"
                />
              </Fragment>
            }
            label="I have written the recovery words"
          />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          style={{ width: '100%' }}
        >
          Proceed
        </Button>

        <Button
          onClick={this.props.generateMnemonic}
          type="button"
          variant="outlined"
          color="primary"
          className={styles.regenerate}
        >
          REGENERATE
        </Button>
      </form>
    )
  }
}

GenerateMnemonic.propTypes = {
  generateMnemonic: PropTypes.func.isRequired,
  loadMnemonic: PropTypes.func.isRequired,
  mnemonic: PropTypes.string.isRequired
}
export default GenerateMnemonic
