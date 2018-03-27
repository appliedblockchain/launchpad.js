import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import styles from './style.module.css'

const Profile = (props) => {
  const { pathname } = props

  return (
    <div className={styles.container}>
      <h2>This is the profile</h2>
      <p>Link to <Link to={ROUTE_URL.home}>Home</Link> page</p>
      <p>pathname coming from router reducer: {pathname} </p>
    </div>
  )
}

Profile.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default Profile
