import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// import crypto from 'crypto'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, FormLabel, Input, IconButton } from '@material-ui/core'
// import { AddBox as AddBoxIcon, IndeterminateCheckBox as IndeterminateCheckBoxIcon  } from '@material-ui/icons'
// import { API_PUBLIC_KEY } from 'config'
import styles from './style.module.css'

const initialFormValues = {
  tag: '',
  text: ''
}

const addNoteValidation = Yup.object().shape({
  tag: Yup.string().required('Required'),
  text: Yup.string().required('Required')
})

const displayError = (errors, touched, field) => {
  console.log('[DE] Returning: ', errors[field] && touched[field])
  return errors[field] && touched[field]
}

class NotesAdd extends Component {
  onSubmit = (values, hooks) => {
    console.log('this.onSubmit value: ', values)
    console.log('this.onSubmit hooks: ', hooks)
  }

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

  // className={styles.field}
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

  renderPublicKeys = () => <div>Here be Public Keys</div>

  renderForm = formProps => {
    const { handleSubmit } = formProps
    return (
      <form className={styles.container} onSubmit={handleSubmit}>
        { this.renderTag(formProps) }
        { this.renderText(formProps) }
        { this.renderPublicKeys(formProps) }
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

// class NotesAdd extends Component {
//   addPublicKey = () => {
//     const { form } = this.props
//     const publicKeyIds = form.getFieldValue('publicKeyIds')
//     const uuid = crypto.randomBytes(16).toString('hex')
//     publicKeyIds[uuid] = uuid
//     form.setFieldsValue({
//       publicKeyIds
//     })
//   }

//   removePublicKey = uuid => {
//     const { form } = this.props
//     const publicKeyIds = form.getFieldValue('publicKeyIds')
//     delete publicKeyIds[uuid]
//     form.setFieldsValue({
//       publicKeyIds
//     })
//   }

//   onSubmit = ev => {
//     ev.preventDefault()
//     const { addNote, form } = this.props

//     form.validateFields((error, { tag, text, publicKeys }) => {
//       if (error) {
//         console.error('form validation error', error)
//         return
//       }

//       const uniquePublicKeys = [ ...[
//         ...new Set(Object.values(publicKeys || {}))
//       ].map(key => key.trim()), API_PUBLIC_KEY ]

//       addNote(tag, text, uniquePublicKeys)

//       // temporary solution
//       form.resetFields()
//     })
//   }

//   renderPublicKeysFields = () => {
//     const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form
//     getFieldDecorator('publicKeyIds', { initialValue: {} })

//     const keys = getFieldValue('publicKeyIds')
//     return Object.values(keys).map(publicKeyId => {
//       return (
//         <div key={publicKeyId} className={styles.flex}>
//           <div className={styles.flex1}>
//             {getFieldDecorator(`publicKeys[${publicKeyId}]`, {
//               rules: [
//                 {
//                   required: true,
//                   message: 'Please provide a public key of a user'
//                 }
//               ],
//               initialValue: ''
//             })(<Input className={styles.pubKey} placeholder="Public key of a user to share note with" />)}
//             <div className={styles.fieldErrors}>
//               {getFieldError(`publicKeys[${publicKeyId}]`)
//                 ? getFieldError(`publicKeys[${publicKeyId}]`).join(',')
//                 : null}
//             </div>
//           </div>
//           <IconButton onClick={() => this.removePublicKey(publicKeyId)}>
//             <IndeterminateCheckBoxIcon
//               color="primary"
//               className={styles.checkboxIcon}
//             />
//           </IconButton>
//         </div>
//       )
//     })
//   }

//   render() {
//     const { getFieldDecorator, getFieldError } = this.props.form

//     return (
//       <form onSubmit={this.onSubmit} className={styles.container}>
//         <FormLabel component="h3">Note Tag</FormLabel>
//         {getFieldDecorator('tag', {
//           rules: [ { required: true, message: 'Please input a note tag!' } ],
//           initialValue: ''
//         })(
//           <Input
//             label="Note Tag"
//             placeholder="Note tag, visible for all users"
//           />
//         )}
//         <div className={styles.fieldErrors}>
//           {getFieldError('tag') ? getFieldError('tag').join(',') : null}
//         </div>
//         <FormLabel component="h3">Secret Note</FormLabel>
//         {getFieldDecorator('text', {
//           rules: [ { required: true, message: 'Please input some text!' } ],
//           initialValue: ''
//         })(
//           <Input
//             multiline
//             rows={2}
//             rowsMax={8}
//             placeholder="Leave a secrete note here"
//             className={styles.field}
//           />
//         )}
//         <div className={styles.fieldErrors}>
//           {getFieldError('text') ? getFieldError('text').join(',') : null}
//         </div>

//         <FormLabel component="h3">
//           Provide public keys of users which you want to share note with
//         </FormLabel>
//         {this.renderPublicKeysFields()}
//         <div className={styles.addContainer}>
//           <IconButton onClick={this.addPublicKey}>
//             <AddBoxIcon color="primary" className={styles.checkboxIcon} />
//           </IconButton>
//         </div>

//         <Button
//           type="submit"
//           variant="outlined"
//           color="primary"
//           className={styles.buttonSubmit}
//         >
//           ADD NOTE
//         </Button>
//       </form>
//     )
//   }
// }
