import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, FormLabel, Input, IconButton } from '@material-ui/core'
import { AddBox as AddBoxIcon, IndeterminateCheckBox as IndeterminateCheckBoxIcon } from '@material-ui/icons'
import { API_PUBLIC_KEY } from 'config'
import styles from './style.module.css'

const initialFormValues = {
  tag: '',
  text: '',
  publicKeys: []
}

const addNoteValidation = Yup.object().shape({
  tag: Yup.string().required('Required'),
  text: Yup.string().required('Required'),
  publicKeys: Yup.array().of(Yup.string().required('Required'))
})

const displayError = (errors, touched, field) =>
  errors[field] && touched[field]

const displayErrorList = (errors, touched, field, index) =>
  errors[field] && errors[field][index] && touched[field] && touched[field][index]

const hasErrors = errors => {
  const regularErrors = { ...errors }
  const arrayErrors = errors.publicKeys ? [ ...errors.publicKeys ] : []
  delete regularErrors.publicKeys
  const hasRegularErrors = Object.values(regularErrors).map(v => !!v).includes(true)
  const hasArrayErrors = Object.values(arrayErrors).map(v => !!v).includes(true)

  return hasRegularErrors || hasArrayErrors
}

const hasBeenTouched = touched => Object.keys(touched).length > 0

class NotesAdd extends Component {
  onSubmit = (values, hooks) => {
    const { addNote } = this.props
    const { tag, text, publicKeys } = values

    const uniquePublicKeys = [ ...[
      ...new Set(publicKeys.map(key => key.trim())), API_PUBLIC_KEY ]
    ]

    addNote(tag, text, uniquePublicKeys)
    hooks.resetForm()
  }

  addPublicKey = (setFieldValue, values) => () => setFieldValue(
    'publicKeys',
    [ ...values.publicKeys, '' ]
  )

  removePublicKey = (setFieldValue, values, index) => () => setFieldValue(
    'publicKeys',
    [ ...values.publicKeys.slice(0, index), ...values.publicKeys.slice(index + 1) ]
  )

  renderTag = ({ handleChange, handleBlur, values, errors, touched }) => (
    <Fragment>
      <FormLabel component="h3">Note Tag</FormLabel>
      <Input
        id="tag"
        type="text"
        placeholder="Note tag, visible for all users"
        value={values.tag}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {displayError(errors, touched, 'tag') && <div className={styles.fieldErrors}>{errors.tag}</div>}
    </Fragment>
  )

  renderText = ({ handleChange, handleBlur, values, errors, touched }) => (
    <Fragment>
      <FormLabel component="h3">Secret Note</FormLabel>
      <Input
        multiline
        rows={2}
        rowsMax={8}
        id="text"
        type="text"
        placeholder="Leave a secrete note here"
        value={values.text}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {displayError(errors, touched, 'text') && <div className={styles.fieldErrors}>{errors.text}</div>}
    </Fragment>
  )

  renderPublicKeys = ({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
    <Fragment>
      <FormLabel component="h3">Public Keys</FormLabel>
      { values.publicKeys.map((publicKey, index) => (
        <Fragment key={`publicKeys[${index}]`}>
          <div className={styles.flex}>
            <Input
              className={styles.flex1}
              name={`publicKeys[${index}]`}
              type="text"
              placeholder="Enter the public key"
              value={publicKey}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <IconButton onClick={this.removePublicKey(setFieldValue, values, index)}>
              <IndeterminateCheckBoxIcon
                color="primary"
                className={styles.checkboxIcon}
              />
            </IconButton>
          </div>
          { displayErrorList(errors, touched, 'publicKeys', index) &&
          <div className={styles.fieldErrors}>{errors.publicKeys[index]}</div> }
        </Fragment>
      )) }
      <div className={styles.addContainer}>
        <IconButton onClick={this.addPublicKey(setFieldValue, values)}>
          <AddBoxIcon color="primary" className={styles.checkboxIcon} />
        </IconButton>
      </div>
    </Fragment>
  )

  renderForm = formProps => {
    const { handleSubmit } = formProps
    return (
      <form className={styles.container} onSubmit={handleSubmit}>
        { this.renderTag(formProps) }
        { this.renderText(formProps) }
        { this.renderPublicKeys(formProps) }
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={styles.buttonSubmit}
          disabled={hasErrors(formProps.errors) || !hasBeenTouched(formProps.touched)}
        >
          ADD NOTE
        </Button>
      </form>
    )
  }

  render() {
    return (
      <Formik
        initialValues={initialFormValues}
        onSubmit={this.onSubmit}
        validationSchema={addNoteValidation}
      >
        {formProps => this.renderForm(formProps)}
      </Formik>
    )
  }
}

NotesAdd.propTypes = {
  addNote: PropTypes.func.isRequired
}

export default (NotesAdd)
