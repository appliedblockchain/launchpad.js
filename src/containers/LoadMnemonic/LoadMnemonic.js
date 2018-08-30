import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
// import asyncValidate from './asyncValidate'
import styles from './style.module.css'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'notes' ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const TextFieldElement = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)
TextFieldElement.propTypes = {
  label: PropTypes.string,
  input: PropTypes.string.isRequired,
  meta: PropTypes.string.object
}

const CheckboxElement = ({ input: { value, onChange }, label }) => (
  <Checkbox label={label} checked={!!value} onCheck={onChange} />
)
CheckboxElement.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.bool.isRequireds,
    onChange: PropTypes.func.isRequired
  })
}

class LoadMnemonic extends Component {
  componentDidMount() {}
  render() {
    const { onCreate, submitting } = this.props
    return (
      <form onSubmit={onCreate} className={styles.container}>
        <Field
          name="mnemonic"
          component={TextFieldElement}
          label="Mnemonic"
          multiLine={true}
          rows={2}
          className={styles.field}
        />

        <Field
          name="check"
          component={CheckboxElement}
          label="I have written the recovery words"
        />

        <Button
          type="submit"
          disabled={submitting}
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
  onCreate: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'create', // a unique identifier for this form
  validate
})(LoadMnemonic)
