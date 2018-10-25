import React from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const UserInfo = ({ publicKey, logout }) => (
  <AppBar position="static">
    <Toolbar className={styles.toolbar}>
      <Typography variant="body2" color="inherit" className={styles.pubKey}>
        {publicKey}
      </Typography>
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
)
UserInfo.propTypes = {
  logout: PropTypes.func.isRequired,
  publicKey: PropTypes.string.isRequired
}

export default UserInfo
