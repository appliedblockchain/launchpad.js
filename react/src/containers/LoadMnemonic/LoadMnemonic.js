import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

import styles from './style.module.css'

class LoadMnemonic extends Component {
  componentDidMount() {}
  onSubmit = ev => {
    ev.preventDefault()
    console.log('Event: ', ev)
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className={styles.container}>
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
  loadMnemonic: PropTypes.func.isRequired
}

export default LoadMnemonic
