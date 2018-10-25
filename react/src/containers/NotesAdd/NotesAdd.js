import React, { Component } from 'react'
import crypto from 'crypto'
import { Button, FormLabel, Input, IconButton } from '@material-ui/core'
import { createForm, formShape } from 'rc-form'
import PropTypes from 'prop-types'
import {
  AddBox as AddBoxIcon,
  IndeterminateCheckBox as IndeterminateCheckBoxIcon
} from '@material-ui/icons'

import styles from './style.module.css'

class NotesAdd extends Component {
  addPublicKey = () => {
    const { form } = this.props
    const publicKeyIds = form.getFieldValue('publicKeyIds')
    const uuid = crypto.randomBytes(16).toString('hex')
    publicKeyIds[uuid] = uuid
    form.setFieldsValue({
      publicKeyIds
    })
  }

  removePublicKey = uuid => {
    const { form } = this.props
    const publicKeyIds = form.getFieldValue('publicKeyIds')
    delete publicKeyIds[uuid]
    form.setFieldsValue({
      publicKeyIds
    })
  }

  onSubmit = ev => {
    ev.preventDefault()
    const { addNote, form } = this.props

    form.validateFields((error, { tag, text, publicKeys }) => {
      if (error) {
        console.log('form validation error', error)
        return
      }

      const uniquePublicKeys = [
        ...new Set(Object.values(publicKeys || {}))
      ].map(key => key.trim())

      addNote(tag, text, uniquePublicKeys)

      // temporary solution
      form.resetFields()
    })
  }

  renderPublicKeysFields = () => {
    const { getFieldDecorator, getFieldValue, getFieldError } = this.props.form
    getFieldDecorator('publicKeyIds', { initialValue: {} })

    const keys = getFieldValue('publicKeyIds')
    return Object.values(keys).map(publicKeyId => {
      return (
        <div key={publicKeyId} className={styles.flex}>
          <div className={styles.flex1}>
            {getFieldDecorator(`publicKeys[${publicKeyId}]`, {
              rules: [
                {
                  required: true,
                  message: 'Please provide a public key of a user'
                }
              ],
              initialValue: ''
            })(<Input className={styles.pubKey} placeholder="Public key of a user to share note with" />)}
            <div className={styles.fieldErrors}>
              {getFieldError(`publicKeys[${publicKeyId}]`)
                ? getFieldError(`publicKeys[${publicKeyId}]`).join(',')
                : null}
            </div>
          </div>
          <IconButton onClick={() => this.removePublicKey(publicKeyId)}>
            <IndeterminateCheckBoxIcon
              color="primary"
              className={styles.checkboxIcon}
            />
          </IconButton>
        </div>
      )
    })
  }

  render() {
    const { getFieldDecorator, getFieldError } = this.props.form

    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
        <FormLabel component="h3">Note Tag</FormLabel>
        {getFieldDecorator('tag', {
          rules: [ { required: true, message: 'Please input a note tag!' } ],
          initialValue: ''
        })(
          <Input
            label="Note Tag"
            placeholder="Note tag, visible for all users"
          />
        )}
        <div className={styles.fieldErrors}>
          {getFieldError('tag') ? getFieldError('tag').join(',') : null}
        </div>
        <FormLabel component="h3">Secret Note</FormLabel>
        {getFieldDecorator('text', {
          rules: [ { required: true, message: 'Please input some text!' } ],
          initialValue: ''
        })(
          <Input
            multiline
            rows={2}
            rowsMax={8}
            placeholder="Leave a secrete note here"
            className={styles.field}
          />
        )}
        <div className={styles.fieldErrors}>
          {getFieldError('text') ? getFieldError('text').join(',') : null}
        </div>

        <FormLabel component="h3">
          Provide public keys of users which you want to share note with
        </FormLabel>
        {this.renderPublicKeysFields()}
        <div className={styles.addContainer}>
          <IconButton onClick={this.addPublicKey}>
            <AddBoxIcon color="primary" className={styles.checkboxIcon} />
          </IconButton>
        </div>

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={styles.buttonSubmit}
        >
          ADD NOTE
        </Button>
      </form>
    )
  }
}

NotesAdd.propTypes = {
  addNote: PropTypes.func.isRequired,
  form: formShape
}

export default createForm()(NotesAdd)
