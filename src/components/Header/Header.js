import React from 'react'
import assets from './assets'
import styles from './style.module.css'

const Header = () => (
  <div className={styles.container}>
    <img src={assets.logo} className={styles.logo} alt="logo" />
    <h2>Welcome to React</h2>
  </div>
)

export default Header
