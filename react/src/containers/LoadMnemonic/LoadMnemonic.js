import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from 'material-ui/TextField'
import { Button } from '@material-ui/core'
import styles from './style.module.css'

// ToDo: displayError and hasErrors / hasBeenTouched are reused - make them a utility
const displayError = (errors, touched, field) =>
  errors[field] && touched[field]

const hasErrors = errors => {
  const regularErrors = { ...errors }
  const arrayErrors = errors.publicKeys ? [ ...errors.publicKeys ] : []
  delete regularErrors.publicKeys
  const hasRegularErrors = Object.values(regularErrors).map(v => !!v).includes(true)
  const hasArrayErrors = Object.values(arrayErrors).map(v => !!v).includes(true)

  return hasRegularErrors || hasArrayErrors
}

const initialFormValues = {
  mnemonic: ''
}

const loadMnemonicValidation = Yup.object().shape({
  mnemonic: Yup.string().required('Required') // ToDo: Require 12 words
})

class LoadMnemonic extends Component {
  onSubmit = values => {
    const { loadMnemonic } = this.props
    const { mnemonic } = values
    loadMnemonic(mnemonic)
  }

  renderForm(formProps) {
    return (
      <form className={styles.container} onSubmit={formProps.handleSubmit}>
        <TextField
          id="mnemonic"
          hintText="Mnemonic"
          multiLine={true}
          rows={2}
          floatingLabelText="Mnemonic"
          className={styles.field}
          value={formProps.values.mnemonic}
          onChange={formProps.handleChange}
          onBlur={formProps.handleBlur}
        />
        { displayError(formProps.errors, formProps.touched, 'mnemonic') &&
        <div className={styles.fieldErrors}>{formProps.errors.mnemonic}</div> }
        <Button
          className={styles.buttonSubmit}
          type="submit"
          variant="outlined"
          color="primary"
          disabled={hasErrors(formProps.errors) || !formProps.values.mnemonic}
        >
          Submit
        </Button>
      </form>
    )
  }

  render() {
    return (
      <Formik
        initialValues={initialFormValues}
        onSubmit={this.onSubmit}
        validationSchema={loadMnemonicValidation}
      >
        {formProps => this.renderForm(formProps)}
      </Formik>
    )
  }
}

LoadMnemonic.propTypes = {
  loadMnemonic: PropTypes.func.isRequired
}

export default LoadMnemonic
