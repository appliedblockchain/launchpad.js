import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { Button } from '@material-ui/core'
import { createForm, formShape } from 'rc-form'

import styles from './style.module.css'

class LoadMnemonic extends Component {
  componentDidMount() {}
  onSubmit = ev => {
    ev.preventDefault()
    this.props.form.validateFields((error, value) => {
      console.log(error, value)
    })
  }
  render() {
    const { getFieldDecorator, getFieldError } = this.props.form
    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        {getFieldDecorator('mnemonic', {
          rules: [ { required: true, message: 'Please input a menemonic!' } ]
        })(
          <TextField
            hintText="Mnemonic"
            multiLine={true}
            rows={2}
            className={styles.field}
            floatingLabelText="Mnemonic"
          />
        )}
        <div className={styles.fieldErrors}>
          {getFieldError('mnemonic')
            ? getFieldError('mnemonic').join(',')
            : null}
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={styles.buttonSubmit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

LoadMnemonic.propTypes = {
  form: formShape
}

export default createForm()(LoadMnemonic)
