import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import styles from './styles.module.css'

const HeaderBack = () => (
  <AppBar position="static">
    <Link to={'/'} className={styles.arrowBackLink}>
      <ArrowBackIcon />
    </Link>
  </AppBar>
)

export default HeaderBack
