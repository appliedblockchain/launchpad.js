import React from 'react'
/* import PropTypes from 'prop-types' */
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import styles from './style.module.css'
const StartScreen = () => (
  <div className={styles.container}>
    <div>
      <Button component={Link} to="/create" variant="outlined" color="primary">
        Create Account
      </Button>
      <Button component={Link} to="/recover" variant="outlined" color="primary">
        Recover Account
      </Button>
    </div>
  </div>
)

StartScreen.propTypes = {}

export default StartScreen
