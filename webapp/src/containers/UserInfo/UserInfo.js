import React from 'react'
import PropTypes from 'prop-types'

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

const UserInfo = ({ publicKey }) => (
  <AppBar position="static">
    <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Typography variant="body2" color="inherit" style={{ fontSize: '9px' }}>
        {publicKey}
      </Typography>
      <IconButton
        aria-haspopup="true"
        onClick={this.handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
)
UserInfo.propTypes = {
  publicKey: PropTypes.string.isRequired
}

export default UserInfo
