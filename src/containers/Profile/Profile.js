import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import './style.css'

const Profile = (props) => {
  const { pathname } = props
  return (
    <div className="Profile">
      <h2>This is the profile</h2>
      <p>Link to <Link to={ROUTE_URL.home}>Home</Link> page</p>
      <p>pathname coming from router reducer: {pathname} </p>
    </div>
  )
}

export default Profile
