import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormControl
} from '@material-ui/core'
import { createForm, formShape } from 'rc-form'

import styles from './style.module.css'

class GenerateMnemonic extends Component {
  componentDidMount() {
    const { generateMnemonic } = this.props
    generateMnemonic()
  }
  onProceed = ev => {
    ev.preventDefault()
    this.props.form.validateFields(error => {
      if (error) {
        return
      }
      const { mnemonic, loadMnemonic } = this.props
      loadMnemonic(mnemonic)
    })
  }
  render() {
    const { mnemonic } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <form onSubmit={this.onProceed} className={styles.container}>
        <div className={styles.mnemonic}>{mnemonic}</div>
        <FormControl required error={true}>
          <FormLabel component="legend" />
          <FormControlLabel
            required
            control={getFieldDecorator('checked', {
              rules: [
                {
                  required: true,
                  message: 'please write down a revovery words!'
                }
              ]
            })(<Checkbox color="primary" />)}
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
  mnemonic: PropTypes.string.isRequired,
  form: formShape
}
export default withRouter(createForm()(GenerateMnemonic))
