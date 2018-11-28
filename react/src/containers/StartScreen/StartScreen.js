import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import styles from './style.module.css'

const GenerateLoadHeader = () => (
  <div className={styles.container}>
    <Button
      id="btnGenerateMnemonic"
      to="/generate-mnemonic"
      component={Link}
      variant="outlined"
      color="primary"
    >
      GENERATE MNEMONIC
    </Button>
    <Button
      id="btnLoadMnemonic"
      to="/load-mnemonic"
      component={Link}
      variant="outlined"
      color="primary"
    >
      LOAD MNEMONIC
    </Button>
  </div>
)

GenerateLoadHeader.propTypes = {}

export default GenerateLoadHeader
