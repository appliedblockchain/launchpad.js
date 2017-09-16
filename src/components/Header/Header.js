import React from 'react'
import Assets from './assets'
import './style.css'

const Header = () => {
  return (
    <div className="Header">
      <img src={Assets.logo} className="Header-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
  )
}

export default Header
