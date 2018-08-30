import React from 'react'
/* import PropTypes from 'prop-types' */
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import styles from './style.module.css'
const StartScreen = () => (
  <div className={styles.container}>
    <div>
      <Button
        component={Link}
        to="/generate-mnemonic"
        variant="outlined"
        color="primary"
      >
        GENERATE MNEMONIC
      </Button>
      <Button
        component={Link}
        to="/load-mnemonmic"
        variant="outlined"
        color="primary"
      >
        LOAD MNEMONIC
      </Button>
    </div>
  </div>
)

StartScreen.propTypes = {}

export default StartScreen
