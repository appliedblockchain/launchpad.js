import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from 'containers/constants.js'
import './style.css'

const Home = () => {
  return (
    <div className="Home">
      <p className="Home-intro">
        This is the homepage
      </p>
      <p>Link to <Link to={ROUTE_URL.profile}>Profile</Link> page</p>
    </div>
  )
}

export default Home
