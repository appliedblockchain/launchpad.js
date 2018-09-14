import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const UserInfo = ({ publicKey, logout }) => (
  <AppBar position="static">
    <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Typography variant="body2" color="inherit" style={{ fontSize: '9px' }}>
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
